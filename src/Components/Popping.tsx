import React from "react";
import { useInView } from "react-intersection-observer";

function Popping(props) {
  const { ref, inView } = useInView({
    threshold: 0.2, 
    triggerOnce: true, 
  });

  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={`transform transition-all duration-1000 ease-in-out ${
          inView
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-75 opacity-0 translate-y-10"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Popping;
