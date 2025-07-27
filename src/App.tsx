import { useState, useEffect, lazy, Suspense, useRef, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast'
import "./App.css";
import { userdetails } from "./Components/Interfaces/Details.interface";
import { RouterFrontend } from "./utils/apiRoutesFrontend";
import { getProfileInfo, getToken } from "./utils/TokenUtilityFunctions";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Swal from "sweetalert2";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function App() {
  const [details, setDetails] = useState<userdetails | undefined>(undefined);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [scrollAtTop, setScrollAtTop] = useState<boolean>(true)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const lastDate: string = useSelector((state: RootState) => state.loginMessage.message)

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (token !== null) {
        setAuthenticated(true);
      }

      const profile = await getProfileInfo();
      if (profile) {
        await setDetails({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          password: profile.password,
          refercode: profile.refercode,
          isvalid: profile.isvalid,
          usenumber: profile.usenumber,
          school_name: profile.school,
          college_name: profile.college,
          college_year: profile.college_year,
          college_stream: profile.college_stream,
          school_year: profile.school_year
        });
      }
    };
    fetchData();
  }, []);
  

  const router_val = useMemo(()=>{
    return RouterFrontend(authenticated, details)
  }, [authenticated, details])
  
  const handleScroll = ()=>{
    if(scrollRef.current){ 
      const scrolltop = scrollRef.current.scrollTop;
      setScrollAtTop(scrolltop == 0)
    }
  }

  useEffect(() => {
    if(lastDate.length > 0){
      const courses: string[] = JSON.parse(localStorage.getItem("pendingCourses")!) || [];
      Swal.fire({
      title: 'Payment Pending',
      text: `The Deadline for the courses ${courses.length > 0 ? courses.map((val) => val) : ''} is coming to an end. Positively make the payment before the deadline to ensure smooth continuation of these courses. Failure to make payment before deadline will result in getting these courses removed from your account`,
      icon: 'info',
      confirmButtonText: 'OK'
    })
    }
  }, [])
  


  return (
    <div className="relative scrollbar-thumb-indigo-800 scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-lime-200 h-screen overflow-y-scroll" 
      ref={scrollRef}
      onScroll={handleScroll}>
      <Toaster/>
      {router_val && <RouterProvider router={router_val}/>}
    </div>
  );
}

export default App;
