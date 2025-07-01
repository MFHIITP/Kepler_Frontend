import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaWhatsapp,
  FaFacebook,
  FaEnvelope,
  FaTwitter,
  FaTimes,
} from "react-icons/fa";

function ReferCode(props) {
  const [refercode, setRefercode] = useState(props.details.refercode);
  const [isopen, setIsopen] = useState(false);

  const handlecopy = async () => {
    await window.navigator.clipboard.writeText(refercode)
    toast.success("Copied Successfully");
  };
  const toggle = () => {
    setIsopen(!isopen);
  };
  
  return (
    <div>
      <div className="flex bg-orange-200 shadow-lg m-4 p-2 rounded-lg">
        <div className="flex flex-col m-12">
          <div className="flex">
            <div className="flex flex-col">
              <div className="text-4xl text-brown-700  font-bold">
                Refer Friends, Win Exciting Cashbacks
              </div>
              <div className="text-2xl  text-brown-700 my-8">
                For every successful referral you can win exciting cashbacks
              </div>
              <div className="bg-white p-4 rounded-lg flex gap-6">
                <div className="flex flex-col">
                  <div className="text-xl ">Your referral code</div>
                  <div className="text-2xl  font-bold">
                    {refercode}
                  </div>
                </div>
                <button
                  className="bg-white text-black  text-xl p-4 px-8 w-fit border border-black rounded-lg hover:bg-gray-200"
                  onClick={handlecopy}
                >
                  COPY
                </button>
                <div className="relative">
                  <button
                    className="bg-gray-700 text-white  text-xl p-4 px-8 w-fit border border-black rounded-lg hover:bg-gray-900 flex gap-8"
                    onClick={toggle}
                  >
                    <div>SHARE</div> {isopen ? <div className="mt-[3px] hover:scale-105 hover:text-red-500"><FaTimes/></div> : <></>}
                  </button>
                  {isopen && (
                    <div className="absolute top-12 left-0 z-10 bg-white border rounded shadow-lg p-4">
                      <p className="mb-2 text-gray-700 font-semibold">
                        Share this content:
                      </p>
                      <div className="flex space-x-4">
                        {/* WhatsApp */}
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                            `${refercode}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-600"
                        >
                          <FaWhatsapp size={24} />
                        </a>
                        {/* Facebook */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <FaFacebook size={24} />
                        </a>
                        {/* Email */}
                        <a
                          href={`mailto:?subject=${encodeURIComponent(
                            "Check this out!"
                          )}&body=${encodeURIComponent(
                            `${refercode}`
                          )}`}
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          <FaEnvelope size={24} />
                        </a>
                        {/* Twitter */}
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            `${refercode}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-500 hover:text-sky-600"
                        >
                          <FaTwitter size={24} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                    <div className="text-lg  mx-2">Uses Left</div>
                    <div className="bg-white w-fit rounded-lg mx-6 px-4 border border-red-200 cursor-default">{props.details.usenumber}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src={"../../../Images/Referral_Image.png"} alt="" />
      </div>
    </div>
  );
}

export default ReferCode;
