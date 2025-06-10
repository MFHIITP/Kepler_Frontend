import React, { useState, useEffect, useRef } from "react";

function Numbers() {
  const serv_addr = import.meta.env.VITE_SERV_ADDR
  const [userNumber, setUserNumber] = useState(6);
  const [courseNumber, setCourseNumber] = useState(8);

  const [startusers, setStartusers] = useState(0);
  const [startcourse, setStartcourse] = useState(0);

  const [visible, setVisible] = useState(false);
  const numberRef = useRef(null);

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
    const servercall = async()=>{
      const response = await fetch(`${serv_addr}/users/usernumber`, {
        method: 'GET'
      })
      const usernum = await response.json()
      console.log(usernum)
      setUserNumber(usernum)
    }
    if (!visible) {
      return;
    }
    let interval_user;
    const func = async()=>{
      await servercall();
      interval_user = setInterval(() => {
        if (startusers < userNumber) {
          setStartusers((startusers) =>
            startusers < userNumber ? startusers + 1 : startusers
          );
        } else {
          clearInterval(interval_user);
        }
      }, 100);
    }
    func();

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
            <div className="text-8xl ml-8">{startcourse}</div> {<div>courses we offer</div>}
            <img src={"../../../Images/Courses.svg"} alt="" className={``}/>
          </div>
        </div>
        <div className="flex justify-evenly m-4 p-2">
          <div className="flex flex-col m-4 p-4 shadow-lg bg-indigo-400 rounded-lg">
          <div className="text-8xl ml-8">{startusers}</div> {<div>total live users</div>}
            <img src={"../../../Images/Live Users.svg"} alt="" className={``}/>
          </div>
          <div className="flex flex-col m-4 p-4 shadow-lg bg-indigo-400 rounded-lg">
          <div className="text-8xl ml-8">{startusers}</div> {<div>total live users</div>}
            <img src={"../../../Images/Live Users.svg"} alt="" className={``}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Numbers;
