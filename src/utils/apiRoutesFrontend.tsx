import { lazy, ReactElement, ReactInstance, Suspense } from "react";
import { userdetails } from "../Components/Interfaces/Details.interface";
import { createBrowserRouter, Navigate } from "react-router-dom";

const Login = lazy(() => import("../Components/Login"));
const Part1 = lazy(() => import("../Components/Part1"));
const Part2 = lazy(() => import("../Components/Part2"));
const Register = lazy(() => import("../Components/Signup"));
const Landing = lazy(() => import("../Components/Landing"));
const QueryBox = lazy(() => import("../Components/QueryBox"));
const Otpverify = lazy(() => import("../Components/VerifyOTP"));
const Meet = lazy(() => import("../Components/Meet"));
const MeetingRoom = lazy(() => import("../Components/MeetingRoom"));
const UsersTable = lazy(() => import("../Components/UserList"));
const LibraryUI = lazy(() => import("../Components/Library"));
const About = lazy(() => import("../Components/About"));
const Courses = lazy(() => import("../Components/Courses"));
const ReadBook = lazy(() => import("../Components/ReadBook"));
const Popping = lazy(() => import("../Components/Popping"));
const ExecutiveTeam = lazy(() => import("../Components/Teams/ExecutiveTeam"));
const DevelopmentTeam = lazy(
  () => import("../Components/Teams/DevelopmentTeam")
);
const PayPal = lazy(() => import("../Components/PayPalComponent"));
const QRPage = lazy(() => import("../Components/QRPage"));
const CoreTeam = lazy(() => import("../Components/Teams/CoreTeam"));
const ContentTeam = lazy(() => import("../Components/Teams/ContentTeam"));
const PRTeam = lazy(() => import("../Components/Teams/PRTeam"));
const Treasury = lazy(() => import("../Components/Teams/Treasury"));
const LiveUsers = lazy(() => import("../Components/Live_Usere"));
const HistoryUsers = lazy(() => import("../Components/History_Users"));
const DonateUs = lazy(() => import("../Components/DonateUs"));
const Course_Details = lazy(() => import("../Components/Course_Details"));
const ReferCode = lazy(() => import("../Components/ReferCode"));
const Course_Schedules = lazy(() => import("../Components/Course_Schedules"));
const GroupChat = lazy(() => import("../Components/GroupChat"));
const Library_main = lazy(() => import("../Components/Library_main"));
const Numbers = lazy(() => import("../Components/Numbers"));
const Login_Auth = lazy(() => import("../Components/Login_Auth"));
const AuthRegister = lazy(() => import("../Components/AuthRegister"));
const Footer = lazy(() => import("../Components/Footer"));

export const RouterFrontend = (
  authenticated: boolean,
  details: userdetails | undefined
) => {
  console.log(authenticated)
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense>
          <div>
            <Popping>
              <Part1 />
            </Popping>
            <Part2 />
            <Popping>
              <Numbers />
            </Popping>
            <Popping>
              <QueryBox />
            </Popping>
            <Popping>
              <Footer />
            </Popping>
          </div>
        </Suspense>
      ),
    },
    {
      path: "authlogin/:email",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Login_Auth />
        </Suspense>
      ),
    },
    {
      path: "/authregister/:email",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <AuthRegister />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/verifyOTP",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Otpverify />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: "/admins/coreteam/executivecommittee",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ExecutiveTeam details={details} />
        </Suspense>
      ),
    },
    {
      path: "/admins/liveusers",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <LiveUsers details={details} />
        </Suspense>
      ),
    },
    {
      path: "/admins/historyusers",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <HistoryUsers details={details} />
        </Suspense>
      ),
    },
    {
      path: "/admins/coreteam/developmentteam",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <DevelopmentTeam details={details} />
        </Suspense>
      ),
    },
    {
      path: "/admins/coreteam/educatorsteam",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ContentTeam details={details} />
        </Suspense>
      ),
    },
    {
      path: "/admins/coreteam/prteam",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <PRTeam details={details} />
        </Suspense>
      ),
    },
    {
      path: "/admins/coreteam/corecommittee",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <CoreTeam details={details} />
        </Suspense>
      ),
    },
    {
      path: "/notice/donation",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <DonateUs />
        </Suspense>
      ),
    },
    {
      path: "/admins/coreteam/treasurycommittee",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Treasury details={details} />
        </Suspense>
      ),
    },
    {
      path: "/notice/donation/qrcode",
      element: (
        <Suspense>
          <QRPage />
        </Suspense>
      ),
    },
    {
      path: "/notice/donation/paypal/:donation",
      element: (
        <Suspense>
          <PayPal />
        </Suspense>
      ),
    },
    {
      path: "/admins/userlist",
      element: authenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
          <UsersTable details={details} />
        </Suspense>
      ) : (
        <></>
      ),
    },
    {
      path: "/profiles",
      element: authenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Landing details={details} />
        </Suspense>
      ) : (
        <></>
      ),
    },
    {
      path: "/group_chat",
      element: authenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
          <GroupChat details={details} />
        </Suspense>
      ) : (
        <></>
      ),
    },
    {
      path: "/meeting",
      element: authenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Meet details={details} />
        </Suspense>
      ) : (
        <></>
      ),
    },
    {
      path: "/jms_meet/:roomId/:username",
      element: authenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
          <MeetingRoom />
        </Suspense>
      ) : (
        <></>
      ),
    },
    {
      path: "/library/resources",
      element: authenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Library_main />
        </Suspense>
      ) : (
        <></>
      ),
    },
    {
      path: "/library/resources/:course",
      element: authenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
          <LibraryUI details={details} />
        </Suspense>
      ) : (
        <></>
      ),
    },
    {
      path: "/aboutus",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>
      ),
    },
    {
      path: "/courses",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Courses />
        </Suspense>
      ),
    },
    {
      path: "/courses/:exam",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Course_Details />
        </Suspense>
      ),
    },
    {
      path: "/readbook/:thisurl",
      element: authenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
          <ReadBook />
        </Suspense>
      ) : (
        <></>
      ),
    },
    {
      path: "/courses/college/refercode",
      element: authenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
          <ReferCode details={details} />
        </Suspense>
      ) : (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/courses/:examname/details",
      element: (
        <>
          <Course_Schedules />
        </>
      ),
    },
  ])};
