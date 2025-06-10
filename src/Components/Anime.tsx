import React, { FC, useEffect, useState } from 'react';
import { componentPropsInterface } from './Interfaces/ComponentProps.interface';

const Anime: FC<componentPropsInterface> = () => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => prev >= 50 ? 1 : prev + 1);
    }, 100);
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className="flex">
        <div className={`${index < 1 ? "hidden" : ""}`}>W</div>
        <div className={`${index < 2 ? "hidden" : ""}`}>h</div>
        <div className={`${index < 3 ? "hidden" : ""}`}>e</div>
        <div className={`${index < 4 ? "hidden" : ""}`}>r</div>
        <div className={`${index < 5 ? "hidden" : ""}`}>e</div>
        <div className={`${index < 6 ? "hidden" : ""}`}>&nbsp;</div>
        <div className={`${index < 7 ? "hidden" : ""}`}>A</div>
        <div className={`${index < 8 ? "hidden" : ""}`}>s</div>
        <div className={`${index < 9 ? "hidden" : ""}`}>p</div>
        <div className={`${index < 10 ? "hidden" : ""}`}>i</div>
        <div className={`${index < 11 ? "hidden" : ""}`}>r</div>
        <div className={`${index < 12 ? "hidden" : ""}`}>a</div>
        <div className={`${index < 13 ? "hidden" : ""}`}>t</div>
        <div className={`${index < 14 ? "hidden" : ""}`}>i</div>
        <div className={`${index < 15 ? "hidden" : ""}`}>o</div>
        <div className={`${index < 16 ? "hidden" : ""}`}>n</div>
        <div className={`${index < 17 ? "hidden" : ""}`}>&nbsp;</div>
        <div className={`${index < 18 ? "hidden" : ""}`}>M</div>
        <div className={`${index < 19 ? "hidden" : ""}`}>e</div>
        <div className={`${index < 20 ? "hidden" : ""}`}>e</div>
        <div className={`${index < 21 ? "hidden" : ""}`}>t</div>
        <div className={`${index < 22 ? "hidden" : ""}`}>s</div>
        <div className={`${index < 23 ? "hidden" : ""}`}>&nbsp;</div>
        <div className={`${index < 24 ? "hidden" : ""}`}>A</div>
        <div className={`${index < 25 ? "hidden" : ""}`}>c</div>
        <div className={`${index < 26 ? "hidden" : ""}`}>h</div>
        <div className={`${index < 27 ? "hidden" : ""}`}>e</div>
        <div className={`${index < 28 ? "hidden" : ""}`}>i</div>
        <div className={`${index < 29 ? "hidden" : ""}`}>v</div>
        <div className={`${index < 30 ? "hidden" : ""}`}>e</div>
        <div className={`${index < 31 ? "hidden" : ""}`}>m</div>
        <div className={`${index < 32 ? "hidden" : ""}`}>e</div>
        <div className={`${index < 33 ? "hidden" : ""}`}>n</div>
        <div className={`${index < 34 ? "hidden" : ""}`}>t</div>
      </div>
    </div>
  )
}

export default Anime;
