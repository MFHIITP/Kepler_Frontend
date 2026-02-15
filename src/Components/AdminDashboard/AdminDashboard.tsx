import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, Eye, IndianRupee, CreditCard, RefreshCw, Lock, AlertCircle } from 'lucide-react';
import apiRoutes from '../../utils/Routes/apiRoutes';
import api from '../../utils/api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ApprovalModal from './ApprovalModal';

export interface ReferralData {
  referral_giver_refer_code: string;
  referral_giver_email: string;
  referral_amount: number;
  referral_money_given_date: string;
  referral_giver_upi_id: string;
  referral_giver_account_number: string;
  referral_giver_ifsc_code: string;
  referral_giver_account_name: string;
  bank_name: string;
  money_given_status: 'pending' | 'approved' | 'rejected';
  wallet_balance: number;
  toChange: boolean;
}

const getDashboardReferralMoneyApprovals = async (): Promise<{responseData: ReferralData[], message: string}> => {
    const data: {responseData: ReferralData[], message: string} = await api.post(apiRoutes.admins.adminMoneyTracker.getAllReferralMoneyApprovals);
    return data;
};

const AdminDashboard: React.FC = () => {
  const [referralData, setReferralData] = useState<ReferralData[] | []>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<ReferralData | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [isLoading, setIsLoading] = useState(false);

  const {mutate: getAllReferralMoneyApprovals} = useMutation({
    mutationFn: getDashboardReferralMoneyApprovals,
    onMutate: () => setIsLoading(true),
    onSuccess: (data) => {
        toast.success("Referral Money Data fetched successfully")
        setReferralData(data.responseData);
        setIsLoading(false);
    },
    onError: () => {
        toast.error("Error fetching referral money data");
        setIsLoading(false);
    }
  })

  const handleOpenModal = (referral: ReferralData, action: 'approve' | 'reject') => {
    setSelectedReferral(referral);
    setActionType(action);
    setIsModalOpen(true);
  };

  const refetchReferralData = () => {
    setReferralData([]);
    getAllReferralMoneyApprovals();
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Eye size={14} />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle size={14} />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle size={14} />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const pendingCount = referralData.filter(r => r.money_given_status === 'pending').length;
  const approvedCount = referralData.filter(r => r.money_given_status === 'approved').length;
  const totalAmount = referralData.reduce((sum, r) => sum + r.wallet_balance, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Shield size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage referral payments and approvals</p>
              </div>
            </div>
            <button
              onClick={refetchReferralData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Approvals</p>
                <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Eye size={28} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved Payments</p>
                <p className="text-3xl font-bold text-gray-900">{approvedCount}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle size={28} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Wallet Balance</p>
                <p className="text-3xl font-bold text-gray-900 flex items-center">
                  <IndianRupee size={24} className="mr-1" />
                  {totalAmount}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <CreditCard size={28} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Referral Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Referral Payment Requests</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Refer Code
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    UPI ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Account Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    IFSC Code
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Account Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Wallet Balance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {referralData.map((referral) => (
                  <tr key={referral?.referral_giver_refer_code} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{referral?.referral_giver_refer_code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{referral?.referral_giver_email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-green-600 flex items-center">
                        <IndianRupee size={14} className="mr-1" />
                        {referral?.referral_amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {(() => {
                          const givenDate = new Date(referral?.referral_money_given_date);
                          if (referral?.toChange) {
                            const currentDate = new Date();
                            const diffTime = currentDate.getTime() - givenDate.getTime();
                            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                            return `${diffDays} days ago`;
                          } else {
                            return givenDate.toLocaleDateString('en-IN');
                          }
                        })()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{referral?.referral_giver_upi_id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 font-mono">{referral?.referral_giver_account_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 font-mono">{referral?.referral_giver_ifsc_code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{referral?.referral_giver_account_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-blue-600 flex items-center">
                        <IndianRupee size={14} className="mr-1" />
                        {referral?.wallet_balance}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(referral?.money_given_status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {referral?.money_given_status === 'pending' ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenModal(referral, 'approve')}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1 text-sm"
                          >
                            <CheckCircle size={14} />
                            Approve
                          </button>
                          <button
                            onClick={() => handleOpenModal(referral, 'reject')}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1 text-sm"
                          >
                            <XCircle size={14} />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No action needed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      <ApprovalModal
        isOpen={isModalOpen}
        referral={selectedReferral}
        actionType={actionType}
        onClose={() => setIsModalOpen(false)}
        refetch={() => refetchReferralData()}
      />
    </div>
  );
};

export default AdminDashboard;