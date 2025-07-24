import React, { useState, useEffect, useRef } from "react";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useQuery } from "@tanstack/react-query";

interface responseInterface {
  users: number;
  courses: number;
}
const getUserNumbers = async () => {
  const { data } = await api.get<responseInterface>(apiRoutes.homePage);
  return data;
};

function Numbers() {
  const [userNumber, setUserNumber] = useState<number>(0);
  const [courseNumber, setCourseNumber] = useState<number>(0);

  const [startusers, setStartusers] = useState(0);
  const [startcourse, setStartcourse] = useState(0);

  const [visible, setVisible] = useState(false);
  const numberRef = useRef(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["userNumbers"],
    queryFn: getUserNumbers,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      }
    );
    observer.observe(numberRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }
    setUserNumber(data?.users ?? -1);
    setCourseNumber(data?.courses ?? -1);
    const interval_user = setInterval(() => {
      if (startusers < userNumber) {
        setStartusers((startusers) =>
          startusers < userNumber ? startusers + 1 : startusers
        );
      } else {
        clearInterval(interval_user);
      }
    }, 100);

    const interval_course = setInterval(() => {
      if (startcourse < courseNumber) {
        setStartcourse((startcourse) =>
          startcourse < courseNumber ? startcourse + 1 : startcourse
        );
      } else {
        clearInterval(interval_course);
      }
    }, 100);

    return () => {
      clearInterval(interval_user);
      clearInterval(interval_course);
    };
  }, [courseNumber, visible]);

  return (
    <div ref={numberRef}>
      <div className="flex flex-col gap-4 text-2xl">
        <div className="flex justify-center">
          <div className="flex flex-col m-4 p-4 shadow-lg bg-indigo-400 rounded-lg">
            <div className="text-8xl ml-8">{startcourse}</div>{" "}
            {<div>courses we offer</div>}
            <img src={"/Images/Courses.svg"} alt="" className={``} />
          </div>
        </div>
        <div className="flex justify-evenly m-4 p-2">
          <div className="flex flex-col m-4 p-4 shadow-lg bg-indigo-400 rounded-lg">
            <div className="text-8xl ml-8">{startusers}</div>{" "}
            {<div>total live users</div>}
            <img src={"/Images/Live Users.svg"} alt="" className={``} />
          </div>
          <div className="flex flex-col m-4 p-4 shadow-lg bg-indigo-400 rounded-lg">
            <div className="text-8xl ml-8">{startusers}</div>{" "}
            {<div>total live users</div>}
            <img src={"/Images/Live Users.svg"} alt="" className={``} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Numbers;
