import React, { useState, useEffect, useContext } from 'react'; 
import { MyContext } from '../main'; 
import api from '../utils/api'; 
import apiRoutes from '../utils/Routes/apiRoutes';

const FetchAndDisplayData = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const context = useContext(MyContext);
  const adminemails = context?.adminemails;
  const serv_addr = import.meta.env.VITE_SERV_ADDR;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(apiRoutes.user.live.liveUsers);
        const result = await response.data;
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [serv_addr]);

  if (!adminemails?.includes(props.details.email)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-red-200 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-red-200">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">You don't have administrator privileges to access this dashboard.</p>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getDeviceIcon = (device) => {
    const deviceLower = device?.toLowerCase() || '';
    if (deviceLower.includes('mobile') || deviceLower.includes('android') || deviceLower.includes('iphone')) return '📱';
    if (deviceLower.includes('tablet') || deviceLower.includes('ipad')) return '💻';
    if (deviceLower.includes('desktop') || deviceLower.includes('windows') || deviceLower.includes('mac')) return '🖥️';
    return '💻';
  };

  const filteredData = data.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.locations?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let aVal = a[sortField] || '';
    let bVal = b[sortField] || '';
    
    if (sortField === 'createdAt') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="text-gray-400">↕️</span>;
    return sortDirection === 'asc' ? <span className="text-blue-600">↑</span> : <span className="text-blue-600">↓</span>;
  };

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
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">📊</div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-xl text-blue-100 max-w-2xl">
                Monitor live user activity and manage your Kepler 22B platform
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
                <div className="text-3xl font-bold text-white">{data.length}</div>
                <div className="text-blue-200">Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{data.length}</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mobile Users</p>
                <p className="text-3xl font-bold text-gray-900">
                  {data.filter(item => item.details?.toLowerCase().includes('mobile')).length}
                </p>
              </div>
              <div className="text-3xl">📱</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Desktop Users</p>
                <p className="text-3xl font-bold text-gray-900">
                  {data.filter(item => !item.details?.toLowerCase().includes('mobile')).length}
                </p>
              </div>
              <div className="text-3xl">🖥️</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Now</p>
                <p className="text-3xl font-bold text-green-600">{filteredData.length}</p>
              </div>
              <div className="text-3xl">🟢</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search users, emails, devices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{sortedData.length}</span> of <span className="font-semibold">{data.length}</span> users
              </div>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-4 text-gray-600">Loading user data...</span>
            </div>
          ) : sortedData.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No users found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th 
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Name</span>
                        <SortIcon field="name" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => handleSort('email_id')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Email</span>
                        <SortIcon field="email_id" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Login Time</span>
                        <SortIcon field="createdAt" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => handleSort('details')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Device</span>
                        <SortIcon field="details" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => handleSort('locations')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Location</span>
                        <SortIcon field="locations" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {sortedData.map((item, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold mr-3 shadow-md">
                            {item.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{item.name || 'Unknown User'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{item.email_id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{formatDateTime(item.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{getDeviceIcon(item.details)}</span>
                          <div className="text-sm text-gray-900">{item.details}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">🌍</span>
                          <div className="text-sm text-gray-900">{item.locations}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchAndDisplayData;