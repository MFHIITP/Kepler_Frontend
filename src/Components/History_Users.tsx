import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../main';
import api from '../utils/api';
import apiRoutes from '../utils/Routes/apiRoutes';

const FetchAndDisplayData = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const context = useContext(MyContext);
  const adminemails = context?.adminemails;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(apiRoutes.user.history.userHistory);
        const result = await response.data;
        result.sort((a, b) => {
          if (a.logouttime === null && b.logouttime !== null) return -1;
          if (a.logouttime !== null && b.logouttime === null) return 1;
          return 0;
        });
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!adminemails?.includes(props.details.email)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full border border-red-100">
          <div className="text-6xl mb-6">🚫</div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 text-lg mb-6">
            You don't have administrator privileges to view this page.
          </p>
          <p className="text-red-500 font-semibold">
            Please contact your system administrator for access.
          </p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status, logouttime) => {
    if (logouttime === null) {
      return <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>;
    }
    return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
  };

  const getStatusBadge = (status, logouttime) => {
    if (logouttime === null) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Online
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
        <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
        Offline
      </span>
    );
  };

  const formatDateTime = (datetime) => {
    if (!datetime) return 'N/A';
    return new Date(datetime).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDeviceIcon = (details) => {
    if (!details) return '💻';
    const deviceInfo = details.toLowerCase();
    if (deviceInfo.includes('mobile') || deviceInfo.includes('android') || deviceInfo.includes('iphone')) {
      return '📱';
    }
    if (deviceInfo.includes('tablet') || deviceInfo.includes('ipad')) {
      return '📱';
    }
    return '💻';
  };

  const filteredData = data.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'online') return matchesSearch && item.logouttime === null;
    if (filter === 'offline') return matchesSearch && item.logouttime !== null;
    return matchesSearch;
  });

  const onlineCount = data.filter(item => item.logouttime === null).length;
  const offlineCount = data.filter(item => item.logouttime !== null).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-400 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-400 rounded-full blur-xl"></div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            User Activity Dashboard
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Monitor real-time user sessions and activity across the Kepler 22B platform
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto mb-4"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium">Loading user activity...</p>
              <p className="text-gray-500 text-sm">Fetching real-time session data</p>
            </div>
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Sessions</p>
                    <p className="text-3xl font-bold text-gray-800">{data.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Online Users</p>
                    <p className="text-3xl font-bold text-green-600">{onlineCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Offline Users</p>
                    <p className="text-3xl font-bold text-gray-600">{offlineCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Active Rate</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {data.length > 0 ? Math.round((onlineCount / data.length) * 100) : 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-bold text-gray-800">Session History</h2>
                  <div className="flex items-center space-x-2">
                    {['all', 'online', 'offline'].map((filterOption) => (
                      <button
                        key={filterOption}
                        onClick={() => setFilter(filterOption)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          filter === filterOption
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                        {filterOption === 'online' && ` (${onlineCount})`}
                        {filterOption === 'offline' && ` (${offlineCount})`}
                        {filterOption === 'all' && ` (${data.length})`}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-64"
                  />
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {filteredData.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No sessions found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Login Time</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Logout Time</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Device</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                {item.name ? item.name.charAt(0).toUpperCase() : item.email.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900">{item.name || 'N/A'}</div>
                                <div className="text-sm text-gray-500">{item.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(item.status, item.logouttime)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                              </svg>
                              {formatDateTime(item.logintime)}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {item.logouttime ? (
                              <div className="flex items-center">
                                <svg className="w-4 h-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                {formatDateTime(item.logouttime)}
                              </div>
                            ) : (
                              <span className="text-green-600 font-medium flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                Active Session
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <span className="text-lg mr-2">{getDeviceIcon(item.details)}</span>
                              <span className="truncate max-w-xs" title={item.details}>
                                {item.details || 'Unknown Device'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="truncate max-w-xs" title={item.locations}>
                                {item.locations || 'Unknown Location'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer Stats */}
            <div className="mt-8 text-center text-gray-500">
              <p className="text-sm">
                Showing {filteredData.length} of {data.length} total sessions
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FetchAndDisplayData;