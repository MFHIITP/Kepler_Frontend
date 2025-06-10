import React from "react";
import Anime from "./Anime";

function Footer() {
  return (
    <div className="bg-gray-800 text-white">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:px-20 my-16">
          {/* About Us Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="underline underline-offset-4 text-2xl font-semibold pb-6 mt-10">
              About Us
            </h1>
            <p className="leading-relaxed">
              We are committed to providing quality services and products to our
              clients. Our mission is to bring the best experience to our
              customers with innovation, creativity, and excellence.
            </p>
            <p>
              For more details Read{" "}
              <a
                href="/aboutus"
                className="text-blue-200 underline mx-1 hover:text-orange-200 transition-transform hover:scale-105"
              >
                Click here
              </a>
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="underline underline-offset-4 text-2xl font-semibold pb-6">
              Contact Us
            </h1>
            <div className="space-y-6">
              <div className="">
              <div className="text-xl  mt-4 ml-4 mb-1">Reach out at us:</div>
                <div className="text-md  mb-4 ml-4">Get all your questions answered about learning with Kepler.</div>
                <div className="text-md flex gap-4  ml-4">
                  <div>Phone :</div>{" "}
                  <div className="transition-transform cursor-pointer hover:scale-110">
                    <a href="callto:+911234567890">+91 12345 67890</a>
                  </div>
                </div>
                <div className="text-md flex gap-4  ml-4">
                  <div>Email :</div>{" "}
                  <a
                    href="mailto:kepler.xxiib.cygnus@gmail.com"
                    className="transition-transform cursor-pointer hover:scale-105"
                  >
                    kepler.xxiib.cygnus@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="underline underline-offset-4 text-2xl font-semibold pb-6">
              Follow Us
            </h1>
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                  alt="LinkedIn"
                  height={30}
                  width={30}
                  className="hover:scale-110 transition-transform duration-300"
                />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  height={30}
                  width={30}
                  className="hover:scale-110 transition-transform duration-300"
                />
              </a>
              <a
                href="https://www.instagram.com/astrosciclubju/profilecard/?igsh=ZmwwZWJ2bmhmdGhl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  height={30}
                  width={30}
                  className="hover:scale-110 transition-transform duration-300"
                />
              </a>
              <a
                href="https://www.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  height={30}
                  width={30}
                  className="hover:scale-110 transition-transform duration-300"
                />
              </a>
            </div>
          </div>
        </div>

      {/* Footer Bottom */}
      <hr className="w-4/5 mx-auto border-t border-gray-700 my-6" />
        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center my-6">
            <img
              src="../../Images/Kepler_Logo.png"
              alt="Company Logo"
              height={100}
              width={100}
              className="rounded-xl mr-1"
            />
            <div className="text-lg">
              <Anime />
            </div>
          </div>
          <div className="text-lg pb-6">Made with Love ❤️ by Kepler Team</div>
        </div>
    </div>
  );
}

export default Footer;
