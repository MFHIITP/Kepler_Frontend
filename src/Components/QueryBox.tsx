import React, { useState } from "react";
import toast from "react-hot-toast";

function QueryBox() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const serv_addr = import.meta.env.VITE_SERV_ADDR
  const handlesubmit = async (e) => {
    e.preventDefault();
    setSending(true)
    try {
      const response = await fetch(`${serv_addr}/api/sendquery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
        }),
      });
      if (response.status == 200) {
        toast.success("Thank you for your feedback");
      } else {
        toast.error("Message cannot be sent");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
    setSending(false);
  };

  return (
    <div className="my-8 sm:mx-20 p-8 rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold border-b-4 border-blue-500 inline-block pb-2">
          Query Box
        </h1>
      </div>
      <form onSubmit={handlesubmit} className="flex sm:block flex-col items-center">
        <div className="flex flex-col-reverse items-center sm:flex-row gap-y-6">
          <div className="flex-1 sm:pr-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-950 rounded-md placeholder-gray-700"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="flex-1 p-2 border border-gray-950 rounded-md placeholder-gray-700"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
              type="text"
              className="w-full p-2 border border-gray-950 rounded-md placeholder-gray-700"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="w-full p-2 border border-gray-950 rounded-md placeholder-gray-700"
              placeholder="Message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="sm:w-1/3 space-y-6">
            <div className="p-2 border border-gray-950 rounded-md text-black">
              <p className="font-bold">Contact Number</p>
              <p><a href="callto:+919903297707">+91 99032 97707</a></p>
            </div> 
            <div className="p-2 border border-gray-950 rounded-md text-black">
              <p className="font-bold">Email ID</p>
              <p><a href="mailto: kepler.xxiib.cygnus@gmail.com">kepler.xxiib.cygnus@gmail.com</a></p>
            </div>
          </div>
        </div>
        <div className="text-left mt-4 ">
          <button
            type="submit"
            className="px-16 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            disabled={sending}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default QueryBox;
