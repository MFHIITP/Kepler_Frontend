import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { RouterProvider } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import "./App.css";
import Cookies from "js-cookie";
import { userdetails } from "./Components/Interfaces/Details.interface";
import { RouterFrontend } from "./utils/apiRoutesFrontend";
const Index = lazy(() => import("./Components/Index"));

function App() {
  const [details, setDetails] = useState<userdetails | undefined>();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [scrollAtTop, setScrollAtTop] = useState<boolean>(true)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const getToken = () => {
    const token = Cookies.get("AccessToken");
    if (token) {
      return token;
    }
    return null;
  };
  const getProfileInfo = () => {
    const profile = Cookies.get("ProfileInfo");
    if (profile) {
      const decodedProfile = decodeURIComponent(profile.substring(2));
      return JSON.parse(decodedProfile);
    }
  };

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

  const router_val = RouterFrontend(authenticated, details)

  const handleScroll = ()=>{
    if(scrollRef.current){ 
      const scrolltop = scrollRef.current.scrollTop;
      setScrollAtTop(scrolltop == 0)
    }
  }


  return (
    <div className="relative scrollbar-thumb-indigo-800 scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-lime-200 h-screen overflow-y-scroll" 
      ref={scrollRef}
      onScroll={handleScroll}>
      <Toaster/>
      <div className={`sticky top-0 left-0 z-20 ${scrollAtTop ? '' : 'bg-gray-200 transition-colors duration-500'}`}>
        <Suspense>
          <Index auth={authenticated} details={details} />
        </Suspense>
      </div>
      <RouterProvider router={router_val}/>
    </div>
  );
}

export default App;
