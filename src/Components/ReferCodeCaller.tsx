import { ArrowRight, Gift } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";

interface referralPropsInterface extends componentPropsInterface {
  auth?: boolean;
}

const ReferCodeCaller: React.FC<referralPropsInterface> = ({details, auth}) => {
  const navigate = useNavigate();
  const handleReferClick = () => {
    navigate("/courses/college/refercode");
  };
  return (
    <div>
      <section className="mb-20">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative lg:flex items-center justify-between">
            <div className="lg:w-2/3 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-6 h-6" />
                <span className="text-purple-100 font-semibold">
                  Referral Rewards
                </span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Earn While You Learn
              </h3>
              <p className="text-lg text-blue-100 mb-2">
                Refer friends and earn cashback rewards:
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-blue-100">
                  • ₹150 minimum cashback (per course) for referring to your friends
                  <br></br>
                  • ₹375 cashback for referring the "Placements Made Easier" tracker to your friends
                </p>
              </div>
              <button
                onClick={handleReferClick}
                className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
              >
                Start Referring
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <img
                  src="/Images/Referral_Image.png"
                  alt="Referral Rewards"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReferCodeCaller;
