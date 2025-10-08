import { useState, useEffect, useRef, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast'
import "./App.css";
import { userdetails } from "./Components/Interfaces/Details.interface";
import { RouterFrontend } from "./utils/apiRoutesFrontend";
import { getProfileInfo, getToken } from "./utils/TokenUtilityFunctions"; 
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
  const [signInRequest, setSignInRequest] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Custom Swal configuration
  const showSignInAlert = async () => {
    const signInAlert = await Swal.fire({
      title: '🔐 Sign In Required',
      html: `
        <div style="text-align: center; margin-top: 1rem;">
          <p style="font-size: 1.1rem; margin-bottom: 1rem;">
            Unlock premium features and enhance your experience
          </p>
          <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px; margin: 1rem 0;">
            <strong>✨ Premium Benefits:</strong><br/>
            • Advanced features<br/>
            • Personalized dashboard<br/>
            • Priority support
          </div>
        </div>
      `,
      showCancelButton: true,
      cancelButtonText: '⏰ Maybe Later',
      confirmButtonText: '🚀 Sign In Now',
      allowOutsideClick: false,
      allowEscapeKey: false,
      width: '450px',
      padding: '2rem',
      // Add custom CSS class if you want to use alternative styles
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        htmlContainer: 'custom-swal-content',
        confirmButton: 'custom-swal-confirm',
        cancelButton: 'custom-swal-cancel'
      },
      // Animation settings
      showClass: {
        popup: 'swal2-show',
        backdrop: 'swal2-backdrop-show'
      },
      hideClass: {
        popup: 'swal2-hide',
        backdrop: 'swal2-backdrop-hide'
      }
    });
    
    return signInAlert;
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
    !authenticated ? setTimeout(() => {
      setSignInRequest(true);
    }, 10000) : setSignInRequest(false);
  }, []);

  useEffect(() => {
    (async () => {
      const path = window.location.pathname
      if(signInRequest && !authenticated && (path !== '/login' && path !== '/authlogin' && path !== '/register' && path !== '/authsignup' && path != '/authlogin/:email')){
        const signInAlert = await showSignInAlert();
        
        if (signInAlert.isConfirmed) {
          toast.success('Redirecting to sign in...', {
            duration: 2000,
            style: {
              background: '#4f46e5',
              color: 'white',
            },
          });
          
          setTimeout(() => {
            window.location.pathname = '/login';
          }, 500);
        } else {
          // Show a subtle reminder toast
          toast('We\'ll remind you again in 30 seconds', {
            icon: '⏰',
            duration: 3000,
          });
          
          setTimeout(() => {
            setSignInRequest(true);
          }, 30000);
        }
      }
    })();

    return () => {
      setSignInRequest(false);
    };
  }, [signInRequest]);
  

  const router_val = useMemo(()=>{
    return RouterFrontend(authenticated, details)
  }, [authenticated, details])
  
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
      <Toaster 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      {router_val && <RouterProvider router={router_val}/>}
    </div>
  );
}

export default App;