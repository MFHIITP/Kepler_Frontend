import { useState } from "react";
import { ReferralData } from "./AdminDashboard";
import { CheckCircle, IndianRupee, XCircle, Lock, AlertCircle } from "lucide-react";
import apiRoutes from "../../utils/Routes/apiRoutes";
import api from "../../utils/api";
import toast from "react-hot-toast";

interface ApprovalModalProps {
  isOpen: boolean;
  referral: ReferralData | null;
  actionType: 'approve' | 'reject';
  onClose: () => void;
  refetch: () => void;
  emailId: string;
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({ isOpen, referral, actionType, onClose, refetch, emailId }) => {
  const [adminSecretKey, setAdminSecretKey] = useState('');

  if (!isOpen || !referral) return null;

  const handleSubmit = async () => {
    const secretKeyResponse = await api.post(apiRoutes.admins.adminMoneyTracker.checkAdminApproval, {
        email: referral.referral_giver_email,
        secretCode: adminSecretKey,
        referCode: referral.referral_giver_refer_code,
        emailId: emailId
    });
    if(secretKeyResponse.status == 200){
        const approvalResponse = await api.post(apiRoutes.admins.adminMoneyTracker.approveReferralMoney, {
            referral_giver_refer_code: referral.referral_giver_refer_code,
            money_transfer_status: actionType === 'approve' ? true : false,
            referral_amount: referral.wallet_balance
        })
        if(approvalResponse.status == 200){
            toast.success(`Payment ${actionType === 'approve' ? 'Approved' : 'Rejected'} Successfully`);
            refetch();
        }
        else{
            toast.error(`Failed to ${actionType === 'approve' ? 'Approve' : 'Reject'} Payment. Please try again.`);
        }
    }
    else{
        toast.error(`Failed to ${actionType === 'approve' ? 'Approve' : 'Reject'} Payment. Invalid Admin Secret Key.`);
    }
    setAdminSecretKey('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
        {/* Modal Header */}
        <div className={`p-6 rounded-t-lg ${actionType === 'approve' ? 'bg-green-600' : 'bg-red-600'}`}>
          <div className="flex items-center gap-3 text-white">
            {actionType === 'approve' ? (
              <CheckCircle size={28} />
            ) : (
              <XCircle size={28} />
            )}
            <h3 className="text-xl font-bold">
              {actionType === 'approve' ? 'Approve Payment' : 'Reject Payment'}
            </h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Refer Code:</span>
              <span className="text-sm font-medium text-gray-900">{referral.referral_giver_refer_code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Email:</span>
              <span className="text-sm font-medium text-gray-900">{referral.referral_giver_email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount:</span>
              <span className="text-sm font-semibold text-green-600 flex items-center">
                <IndianRupee size={14} />
                {referral.referral_amount}
              </span>
            </div>
          </div>

          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Lock size={16} />
                Admin Secret Key *
              </div>
            </label>
            <input
              type="password"
              value={adminSecretKey}
              onChange={(e) => setAdminSecretKey(e.target.value)}
              placeholder="Enter admin secret key"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              autoFocus
            />
          </div>

          <div className={`flex items-start gap-2 p-3 rounded-lg ${
            actionType === 'approve' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <AlertCircle size={20} className={actionType === 'approve' ? 'text-green-600' : 'text-red-600'} />
            <p className={`text-sm ${actionType === 'approve' ? 'text-green-800' : 'text-red-800'}`}>
              {actionType === 'approve' 
                ? 'This action will approve the payment and mark it as completed.'
                : 'This action will reject the payment request.'}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 rounded-b-lg flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!adminSecretKey}
            className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed ${
              actionType === 'approve' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {actionType === 'approve' ? 'Approve' : 'Reject'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;