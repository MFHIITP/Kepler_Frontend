import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

const loginFunction = async (emailID: string) => {
  const { data } = await api.post(apiRoutes.auth.login.authLogin, {
    email: emailID,
  });
  return data;
};

function Login_Auth() {
  const { email } = useParams();

  const { mutate: authLoginMutation } = useMutation({
    mutationFn: (email: string) => loginFunction(email),
    onSuccess: (data) => {
      if (data.accessToken != null && data.refreshToken != null) {
        Cookies.set("AccessToken", data.accessToken, {
          path: "/",
          secure: true,
          sameSite: "None",
        });
        Cookies.set("RefreshToken", data.refreshToken, {
          path: "/",
          secure: true,
          sameSite: "None",
        });
        Cookies.set("ProfileInfo", JSON.stringify(data.profileinfo), {
          path: "/",
          secure: true,
          sameSite: "None",
        });
        localStorage.setItem(
          "toast_message",
          `Login Successful! Welcome to Kepler ${data.profileinfo.name}`
        );
        if (data.sendAlert) {
          localStorage.setItem("paymentLastDate", data.lastDate);
          localStorage.setItem("pendingCourses", JSON.stringify(data.courses));
        }
        window.location.href = "/";
      }
    },
    onError: () => {
      localStorage.setItem(
        "authfail",
        "Please provide some more informations about yourself."
      );
      window.location.href = `/authregister/${email}`;
    },
  });

  useEffect(() => {
    authLoginMutation(email!);
  }, []);

  return (
    <div className="m-12 text-xl text-blue-800 font-mono">
      Your credentials have been verified successfully.
      <div>You are going to be directed to the website shortly.</div> Please
      wait patiently.
      <img
        src="/Images/milky-way-shooting-star.webp"
        alt=""
        height={600}
        width={600}
        className="mt-6 rounded-lg"
      />
    </div>
  );
}

export default Login_Auth;
