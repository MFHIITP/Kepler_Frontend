import React, { useEffect, useState } from "react";
import {
  Share2, Copy, Gift, Users, MessageCircle, Mail, X, Check, Sparkles, Trophy, ArrowRight
} from "lucide-react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";

const getreferCode = async (emailID: string) => {
  const { data } = await api.post(apiRoutes.courses.referCode.getReferCode, { email: emailID });
  return data;
};

interface ReferCodeInterface extends componentPropsInterface {
  auth: boolean;
}

const referCode: React.FC<ReferCodeInterface> = ({ details, auth }) => {
  const [referCode, setReferCode] = useState<string | null>(null);
  const [isOpen, setisOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [numberLeft, setNumberLeft] = useState(0);

  const { mutate: getreferCodeMutation } = useMutation({
    mutationFn: () => getreferCode(details?.email ?? ""),
    onSuccess: (data) => { setReferCode(data.referCode); setNumberLeft(data.numberLeft); },
    onError: () => { toast.error("Error fetching refer code"); }
  });

  useEffect(() => {
    if (details?.email) getreferCodeMutation();
  }, [details?.email, auth]);

  const handlecopy = async () => {
    await window.navigator.clipboard.writeText(referCode!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4">
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl shadow-lg border border-orange-200/50">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-400 to-yellow-400 rounded-full transform translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-amber-400 to-orange-400 rounded-full transform -translate-x-28 translate-y-28" />
        </div>

        <div className="relative p-6">
          
          {/* Header Row */}
          <div className="flex items-center mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl mr-3">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <Trophy className="w-4 h-4 text-orange-600 mr-1" />
            <span className="text-orange-600 font-semibold text-xs uppercase tracking-wide">Referral Program</span>
          </div>

          {/* Title + Subtitle */}
          <h1 className="text-2xl font-bold text-slate-800 mb-1 leading-tight">
            Refer Friends,{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Win Exciting Cashbacks
            </span>
            <Sparkles className="inline w-5 h-5 text-amber-500 ml-1 -mt-1" />
          </h1>
          <p className="text-sm text-slate-600 mb-4 max-w-2xl leading-relaxed">
            For every successful referral you can win exciting cashbacks and help your friends discover amazing learning opportunities.
          </p>

          {/* Referral Code Card */}
          {auth && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow border border-white/50 mb-4">
              <div className="flex flex-wrap items-center gap-4">

                {/* Code */}
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-0.5">Your referral code</p>
                  <span className="text-xl font-bold text-slate-800 font-mono">{referCode}</span>
                </div>

                {/* Copy */}
                <button
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                    copied ? "bg-green-500 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
                  }`}
                  onClick={handlecopy}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "COPIED!" : "COPY"}
                </button>

                {/* Share */}
                <div className="relative">
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg font-semibold text-sm hover:from-slate-800 hover:to-slate-900 transition-all duration-200 flex items-center gap-2"
                    onClick={() => setisOpen(!isOpen)}
                  >
                    {isOpen ? <X className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    {isOpen ? "CLOSE" : "SHARE"}
                  </button>

                  {isOpen && (
                    <div className="absolute top-11 left-0 w-72 z-20 bg-white rounded-xl shadow-2xl border border-slate-200 p-4">
                      <div className="flex items-center mb-3">
                        <Share2 className="w-4 h-4 text-slate-600 mr-2" />
                        <p className="font-semibold text-slate-800 text-sm">Share your referral code</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Hey! Join me on this amazing learning platform with my referral code: ${referCode}`)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center p-2.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors group"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          <span className="font-medium text-sm">WhatsApp</span>
                          <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a
                          href={`mailto:?subject=${encodeURIComponent("Join me on this learning platform!")}&body=${encodeURIComponent(`Use my referral code: ${referCode}`)}`}
                          className="flex items-center p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors group"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="font-medium text-sm">Email</span>
                          <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <button
                          onClick={handlecopy}
                          className="flex items-center p-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-600 transition-colors group col-span-2"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          <span className="font-medium text-sm">Copy referral code</span>
                          <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Referrals left */}
                <div className="ml-auto">
                  <p className="text-xs font-medium text-slate-500 mb-0.5">Referrals Left</p>
                  <div className="flex items-center gap-1.5">
                    <div className="bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200 rounded-lg px-3 py-1">
                      <span className="text-base font-bold text-orange-700">{numberLeft || "5"}</span>
                    </div>
                    <Users className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Benefits Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: <Gift className="w-4 h-4 text-orange-600" />, bg: "bg-orange-100", title: "Earn Rewards", sub: "Get cashback for referrals" },
              { icon: <Users className="w-4 h-4 text-amber-600" />, bg: "bg-amber-100", title: "Help Friends", sub: "Share learning opportunities" },
              { icon: <Trophy className="w-4 h-4 text-yellow-600" />, bg: "bg-yellow-100", title: "Unlock Bonuses", sub: "More referrals, more rewards" },
            ].map((b, i) => (
              <div key={i} className="flex items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-100">
                <div className={`p-1.5 ${b.bg} rounded-lg mr-3 flex-shrink-0`}>{b.icon}</div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{b.title}</p>
                  <p className="text-xs text-slate-500">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default referCode;