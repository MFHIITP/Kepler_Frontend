import React, { FC, Suspense, lazy, useRef, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { componentPropsInterface } from "../Components/Interfaces/ComponentProps.interface";
const Index = lazy(() => import("../Components/Index"));

const MainLayout: FC<componentPropsInterface> = ({ auth, details }) => {
  return (
    <div> 
      <div
        className={`sticky top-0 left-0 z-20 bg-gray-200`}
      >
        <Suspense>
          <Index auth={auth} details={details} />
        </Suspense>
      </div>
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
