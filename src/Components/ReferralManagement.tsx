import React, { SetStateAction, useState, Dispatch, useEffect } from "react";
import { Users, Wallet, Clock, CheckCircle, XCircle, IndianRupee, CreditCard, Building2, Save, TrendingUp, Award, AlertCircle } from "lucide-react";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { StreamEvent } from "./Connections/Connection.interface";

interface Referral {
  referCode: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateReferred: string;
  status: "pending" | "confirmed" | "rejected";
  amount: number;
  verifiedDate?: string;
  paidAmount: boolean;
}

interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  branch: string;
}

interface referralPropsInterface extends componentPropsInterface {
  goToPage: Dispatch<SetStateAction<string>>;
}

const getPendingReferrals = async (emailId: string) => {
  const { data } = await api.post(apiRoutes.referrals.getPendingReferrals, {
    emailId: emailId,
  });
  return data;
};

const acceptRejectReferrals = async ({ emailId, referralCodeAcceptedOrRejected, status }: { emailId: string; referralCodeAcceptedOrRejected: string; status: boolean }) => {
  const { data } = await api.post(apiRoutes.referrals.acceptRejectReferral, {
    emailId: emailId,
    referralCodeAcceptedOrRejected: referralCodeAcceptedOrRejected,
    status: status,
  });
  return data;
};

const saveBankDetails = async ({
  emailId,
  accountName,
  accountId,
  ifsc_code,
  branch,
}: {
  emailId: string;
  accountName: string;
  accountId: string;
  ifsc_code: string;
  branch: string;
}) => {
  const { data } = await api.post(apiRoutes.referrals.saveBankDetails, {
    emailId: emailId,
    accountName: accountName,
    accountId: accountId,
    ifsc_code: ifsc_code,
    branch: branch,
  });
  return data;
};

const ReferralManagement: React.FC<referralPropsInterface> = ({
  details,
  goToPage,
}) => {
  const [activeTab, setActiveTab] = useState<"completed" | "pending" | "wallet">("completed");
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    branch: ""
  });
  const [completedReferrals, setCompletedReferrals] = useState<Referral[]>([]);
  const [pendingReferrals, setPendingReferrals] = useState<Referral[]>([]);
  const [walletBalance, setWalletBalance] = useState<Number>(0);
  const [loading, setLoading] = useState(false);
  const [isBankDetailsSaved, setIsBankDetailsSaved] = useState(false);

  const { mutate: getPendingReferralsMutation } = useMutation({
    mutationFn: (emailId: string) => getPendingReferrals(emailId),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setPendingReferrals(data.referralsList);
      setLoading(false);
      toast.success(`${data.referralsList.length} requests approval pending`);
    },
    onError: () => {
      setLoading(false);
      toast.error("Failed to get approvals pending");
    },
  });

  const { mutate: acceptRejectReferralsMutation } = useMutation({
    mutationFn: ({
      emailId,
      referralCodeAcceptedOrRejected,
      status,
    }: {
      emailId: string;
      referralCodeAcceptedOrRejected: string;
      status: boolean;
    }) =>
      acceptRejectReferrals({
        emailId,
        referralCodeAcceptedOrRejected,
        status,
      }),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setLoading(false);
      toast.success(`Referral ${data.status}`);
      setPendingReferrals((prev) => prev.filter((referral) => referral.referCode !== data.referralCodeAcceptedOrRejected));
    },
    onError: () => {
      (setLoading(false), toast.error("Failed to process Referral decision"));
    },
  });

  const { mutate: saveBankDetailsMutation } = useMutation({
    mutationFn: ({ emailId, accountName, accountId, ifsc_code, branch }: { emailId: string; accountName: string; accountId: string; ifsc_code: string; branch: string }) =>
      saveBankDetails({ emailId, accountName, accountId, ifsc_code, branch }),
    onMutate: () => setLoading(true),
    onSuccess: () => {
      setLoading(false);
      toast.success("Bank Details Saved Successfully");
    },
    onError: () => {
      setLoading(false);
      toast.error("Failed to set bank details, please save again");
    },
  });

  const handleSaveBankDetails = () => {
    if (
      bankDetails.accountNumber &&
      bankDetails.ifscCode &&
      bankDetails.accountHolderName &&
      bankDetails.branch
    ) {
      saveBankDetailsMutation({
        emailId: details?.email!,
        accountName: bankDetails.accountHolderName,
        accountId: bankDetails.accountNumber,
        ifsc_code: bankDetails.ifscCode,
        branch: bankDetails.branch,
      });
    }
  };

  const handleConfirmReferral = (
    referCode: string,
    status: boolean,
  ) => {
    acceptRejectReferralsMutation({
      emailId: details?.email!,
      referralCodeAcceptedOrRejected: referCode,
      status: status,
    });
  };

  useEffect(() => {
    if (activeTab == "pending") {
      getPendingReferralsMutation(details?.email!);
    } else if (activeTab == "completed") {
      setCompletedReferrals([]);
      const controller = new AbortController();
      const startStream = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_SERV_ADDR}/${apiRoutes.referrals.getAcceptedReferrals}`,{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/x-ndjson",
                Authorizationaccesstoken: `Bearer ${Cookies.get("AccessToken") || ""}`,
              },
              body: JSON.stringify({
                email: details?.email,
              }),
              signal: controller.signal,
            },
          );
          const reader = response.body?.getReader();
          const decoder = new TextDecoder("utf-8");
          let buffer = "";
          while (true) {
            const { value, done } = await reader!.read();
            if (done) {
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop()!;

            for (const line of lines) {
              if (!line.trim()) {
                continue;
              }
              console.log(line);
              const data: StreamEvent = JSON.parse(line);
              console.log(data);
              if (data.type == "Connection") {
                setCompletedReferrals((prevReferral) => {
                  return [...prevReferral, data.responseData];
                });
              } else if (data.type == "start") {
                setWalletBalance(data.walletBalance);
              }
            }
          }
        } catch (error) {
          if (error instanceof DOMException && error.name == "AbortError") {
            console.log("Stream Aborted");
          } else {
            console.log("Error in streaming confirmed referrals", error);
          }
        }
      };
      startStream();
      return () => controller.abort();
    } else {
      return () => {
        console.log("Not needed");
      };
    }
  }, [details?.email, activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Referral & Earnings Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your referrals and track your earnings
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Earned</p>
                <p className="text-2xl font-bold text-gray-900 flex items-center">
                  <IndianRupee size={20} className="mr-1" />
                  {walletBalance.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Wallet size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Confirmed Referrals
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    completedReferrals.filter((r) => r?.status === "confirmed")
                      .length
                  }
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <CheckCircle size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Pending Confirmations
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingReferrals.length}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Users size={24} className="text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("completed")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "completed"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Award size={20} />
              <span>Completed Referrals</span>
              <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {completedReferrals.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "pending"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Clock size={20} />
              <span>Pending Confirmations</span>
              <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {pendingReferrals.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("wallet")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "wallet"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Wallet size={20} />
              <span>Wallet & Payouts</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "completed" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Sr. No.
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Referee Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date Referred
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Paid Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {completedReferrals.map((referral, index) => (
                    <tr
                      key={referral?.referCode}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {referral?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {referral?.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {referral?.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {referral?.dateReferred}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {referral?.status === "confirmed" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle size={14} />
                            Confirmed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            <XCircle size={14} />
                            Rejected
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900 flex items-center">
                          <IndianRupee size={14} className="mr-1" />
                          {referral?.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900 flex items-center">
                          {referral?.paidAmount ? "Paid" : "Not Paid"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "pending" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Sr. No.
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Referee Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date Referred
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Expected Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingReferrals.map((referral, index) => (
                    <tr
                      key={referral.referCode}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {referral.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {referral.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {referral.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {referral.dateReferred}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900 flex items-center">
                          <IndianRupee size={14} className="mr-1" />
                          {referral.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleConfirmReferral(referral.referCode, true)
                            }
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1"
                          >
                            <CheckCircle size={14} />
                            Confirm
                          </button>
                          <button
                            onClick={() =>
                              handleConfirmReferral(referral.referCode, false)
                            }
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1"
                          >
                            <XCircle size={14} />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "wallet" && (
          <div className="space-y-6">
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-blue-100 mb-2">Current Wallet Balance</p>
                  <h2 className="text-4xl font-bold flex items-center">
                    <IndianRupee size={32} className="mr-2" />
                    {walletBalance.toFixed(2)}
                  </h2>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-full">
                  <Wallet size={48} />
                </div>
              </div>
            </div>

            {/* Minimum Withdrawal Notice */}
            {walletBalance < 200 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle
                    size={24}
                    className="text-yellow-600 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                      Minimum Withdrawal Amount Not Reached
                    </h3>
                    <p className="text-yellow-800 mb-3">
                      You need a minimum balance of ₹200 to withdraw your
                      earnings. You currently have ₹{walletBalance.toFixed(2)}{" "}
                      in your wallet.
                    </p>
                    <div className="bg-yellow-100 rounded-lg p-3 inline-block">
                      <p className="text-sm font-medium text-yellow-900">
                        Only ₹{(200 - walletBalance).toFixed(2)} more to go!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Details Form (Only shows when balance >= 200) */}
            {walletBalance >= 200 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CreditCard size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Bank Account Details
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isBankDetailsSaved
                        ? "Your bank details are saved. Edit them below if needed."
                        : "Please provide your bank account details to receive payments"}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Holder Name *
                    </label>
                    <input
                      type="text"
                      value={bankDetails.accountHolderName}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          accountHolderName: e.target.value,
                        })
                      }
                      placeholder="Enter full name as per bank"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      value={bankDetails.accountNumber}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          accountNumber: e.target.value,
                        })
                      }
                      placeholder="Enter account number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IFSC Code *
                    </label>
                    <input
                      type="text"
                      value={bankDetails.ifscCode}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          ifscCode: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="Enter IFSC code"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <button
                    onClick={handleSaveBankDetails}
                    disabled={
                      !bankDetails.accountNumber ||
                      !bankDetails.ifscCode ||
                      !bankDetails.accountHolderName
                    }
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <Save size={20} />
                    Save Bank Details
                  </button>
                  {isBankDetailsSaved && (
                    <span className="flex items-center gap-2 text-green-600 font-medium">
                      <CheckCircle size={20} />
                      Details Saved Successfully
                    </span>
                  )}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Building2
                      size={20}
                      className="text-blue-600 flex-shrink-0 mt-1"
                    />
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-1">Payment Schedule</p>
                      <p>
                        Payments are processed at the end of each month. Your
                        earnings will be transferred to the provided bank
                        account within 3-5 business days after month-end.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Recent Earnings
              </h3>
              <div className="space-y-3">
                {completedReferrals
                  .filter((r) => r?.status === "confirmed")
                  .slice(0, 5)
                  .map((referral) => (
                    <div
                      key={referral?.referCode}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle size={20} className="text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {referral?.refereeName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {referral?.verifiedDate
                              ? new Date(
                                  referral?.verifiedDate,
                                ).toLocaleDateString("en-IN")
                              : "-"}
                          </p>
                        </div>
                      </div>
                      <span className="text-green-600 font-semibold flex items-center">
                        +<IndianRupee size={16} />
                        {referral?.amount}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralManagement;
