import React, { useEffect, useState } from "react";
import {
  Share2,
  Copy,
  Gift,
  Users,
  MessageCircle,
  Mail,
  X,
  Check,
  Sparkles,
  Trophy,
  ArrowRight
} from "lucide-react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const getreferCode = async(emailID: string) => {
  const { data } = await api.post(apiRoutes.courses.referCode.getReferCode, {
    email: emailID
  })
  return data;
}

function referCode(props) {
  const [referCode, setReferCode] = useState<string | null>(null);
  const [isOpen, setisOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [numberLeft, setNumberLeft] = useState(0);

  const { mutate: getreferCodeMutation } = useMutation({
    mutationFn: () => getreferCode(props.details.email),
    onSuccess: (data) => {
      setReferCode(data.referCode);
      setNumberLeft(data.numberLeft);
    },
    onError: (error) => {
      toast.error("Error fetching refer code");
    }
  })

  useEffect(() => {
    if(props.details?.email){
      getreferCodeMutation();
    }
  }, [])
  

  const handlecopy = async () => {
    await window.navigator.clipboard.writeText(referCode!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // Replace with your toast implementation
    console.log("Copied Successfully");
  };

  const toggle = () => {
    setisOpen(!isOpen);
  };
  
  return (
    <div className="p-6">
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-3xl shadow-xl border border-orange-200/50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-400 to-yellow-400 rounded-full transform translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-400 to-orange-400 rounded-full transform -translate-x-40 translate-y-40"></div>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12">
          {/* Content Section */}
          <div className="flex-1 lg:mr-12 mb-8 lg:mb-0">
            {/* Header with Icon */}
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl mr-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <div className="flex items-center">
                <Trophy className="w-6 h-6 text-orange-600 mr-2" />
                <span className="text-orange-600 font-semibold text-sm uppercase tracking-wide">Referral Program</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">
              Refer Friends,{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Win Exciting
              </span>
              <br />
              <span className="flex items-center mt-2">
                Cashbacks
                <Sparkles className="w-8 h-8 text-amber-500 ml-2" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
              For every successful referral you can win exciting cashbacks and help your friends discover amazing learning opportunities.
            </p>

            {/* Referral Code Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                {/* Referral Code Section */}
                <div className="lg:col-span-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Your referral code</p>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-slate-800 font-mono">
                      {referCode}
                    </span>
                  </div>
                </div>

                {/* Copy Button */}
                <div className="lg:col-span-1">
                  <button
                    className={`w-full lg:w-auto px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                      copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                    }`}
                    onClick={handlecopy}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'COPIED!' : 'COPY'}</span>
                  </button>
                </div>

                {/* Share Button */}
                <div className="lg:col-span-1 relative">
                  <button
                    className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl font-semibold hover:from-slate-800 hover:to-slate-900 transition-all duration-200 flex items-center justify-center space-x-2"
                    onClick={toggle}
                  >
                    {isOpen ? <X className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    <span>{isOpen ? 'CLOSE' : 'SHARE'}</span>
                  </button>

                  {/* Share Dropdown */}
                  {isOpen && (
                    <div className="absolute top-14 left-0 right-0 lg:left-auto lg:right-0 lg:w-80 z-20 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 animate-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center mb-4">
                        <Share2 className="w-5 h-5 text-slate-600 mr-2" />
                        <p className="font-semibold text-slate-800">Share your referral code</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {/* WhatsApp */}
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                            `Hey! Join me on this amazing learning platform with my referral code: ${referCode}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 transition-colors duration-200 group"
                        >
                          <MessageCircle className="w-5 h-5 mr-3" />
                          <span className="font-medium">WhatsApp</span>
                          <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>

                        {/* Email */}
                        <a
                          href={`mailto:?subject=${encodeURIComponent(
                            "Join me on this learning platform!"
                          )}&body=${encodeURIComponent(
                            `I found this amazing learning platform and thought you'd love it! Use my referral code: ${referCode} to get started.`
                          )}`}
                          className="flex items-center p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors duration-200 group"
                        >
                          <Mail className="w-5 h-5 mr-3" />
                          <span className="font-medium">Email</span>
                          <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>

                        {/* Copy Link */}
                        <button
                          onClick={handlecopy}
                          className="flex items-center p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600 transition-colors duration-200 group col-span-2"
                        >
                          <Copy className="w-5 h-5 mr-3" />
                          <span className="font-medium">Copy referral code</span>
                          <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Uses Left */}
                <div className="lg:col-span-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Referrals Left</p>
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200 rounded-xl px-4 py-2">
                      <span className="text-lg font-bold text-orange-700">
                        {numberLeft || '5'}
                      </span>
                    </div>
                    <Users className="w-5 h-5 text-orange-500 ml-2" />
                  </div>
                </div>
              </div>
            </div>
            <img src={"/Images/Referral_Image.png"} alt="" />

            {/* Benefits Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-100">
                <div className="p-2 bg-orange-100 rounded-lg mr-3">
                  <Gift className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Earn Rewards</p>
                  <p className="text-sm text-slate-600">Get cashback for referrals</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-100">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Help Friends</p>
                  <p className="text-sm text-slate-600">Share learning opportunities</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-100">
                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Unlock Bonuses</p>
                  <p className="text-sm text-slate-600">More referrals, more rewards</p>
                </div>
              </div>
            </div>
          </div>

          {/* Illustration Section */}
          <div className="flex-shrink-0 lg:w-96">
            <div className="relative">
              {/* Fallback illustration if image doesn't load */}
              <div className="w-80 h-80 bg-gradient-to-br from-orange-200 to-amber-300 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <Gift className="w-24 h-24 text-orange-600 mx-auto mb-4" />
                  <div className="text-orange-700 font-bold text-xl">Referral Rewards</div>
                  <div className="text-orange-600">Share & Earn</div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default referCode;