import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchDialog from "../searchDialog/SearchDialog";
import "./Nav.css";

export default function Nav() {
  const admin = localStorage.getItem("admin");
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`container-nav ${isScrolled ? "nav-scrolled" : ""}`}>
      <nav className="Navbar">
        <Link to="/" className="nav-logo" title="Volver a inicio">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="500pt"
            height="500pt"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMidYMid meet"
          >
            <g transform="translate(0,500) scale(0.1,-0.1)" stroke="none">
              <path
                d="M2445 4925 l-25 -24 0 -361 0 -361 25 -24 c15 -16 36 -25 55 -25 19
0 40 9 55 25 l25 24 0 361 0 361 -25 24 c-15 16 -36 25 -55 25 -19 0 -40 -9
-55 -25z"
              />
              <path
                d="M3928 4022 c-285 -285 -288 -289 -230 -345 57 -55 61 -53 344 231
284 284 286 286 229 343 -57 57 -59 55 -343 -229z"
              />
              <path
                d="M739 4241 c-57 -57 -55 -59 229 -343 284 -284 286 -286 343 -229 57
57 55 59 -229 343 -284 284 -286 286 -343 229z"
              />
              <path
                d="M2379 3949 c-339 -28 -659 -177 -905 -423 -401 -401 -531 -978 -342
-1516 141 -401 477 -737 878 -878 324 -113 656 -113 980 0 401 141 737 477
878 878 113 324 113 656 0 980 -140 396 -473 732 -868 874 -111 40 -264 75
-355 81 -44 3 -100 7 -125 9 -25 2 -88 0 -141 -5z m41 -449 l0 -300 -511 0
-511 0 17 28 c74 115 232 271 361 358 177 118 436 209 607 213 l37 1 0 -300z
m310 284 c264 -45 493 -166 690 -364 257 -256 380 -554 380 -920 0 -366 -123
-664 -380 -920 -154 -154 -321 -258 -520 -323 -77 -25 -240 -57 -292 -57 l-28
0 0 1300 0 1300 28 0 c16 0 71 -7 122 -16z m-310 -979 l0 -235 -610 0 -610 0
0 33 c0 89 47 287 94 400 l16 37 555 0 555 0 0 -235z m0 -640 l0 -245 -546 0
-545 0 -25 57 c-52 117 -104 322 -104 410 l0 23 610 0 610 0 0 -245z m0 -685
l0 -280 -28 0 c-52 0 -215 32 -292 57 -176 57 -346 157 -481 281 -70 65 -189
201 -189 216 0 3 223 6 495 6 l495 0 0 -280z"
              />
              <path
                d="M45 2545 c-33 -32 -33 -78 0 -110 l24 -25 361 0 361 0 24 25 c33 32
33 78 0 110 l-24 25 -361 0 -361 0 -24 -25z"
              />
              <path
                d="M4175 2535 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 l24 -25 361
0 361 0 24 25 c16 15 25 36 25 55 0 19 -9 40 -25 55 l-24 25 -361 0 -361 0
-24 -25z"
              />
              <path
                d="M958 1062 c-284 -284 -286 -286 -229 -343 57 -57 59 -55 343 229 284
284 286 286 229 343 -57 57 -59 55 -343 -229z"
              />
              <path
                d="M3686 1279 c-50 -59 -49 -60 232 -341 284 -284 286 -286 343 -229 57
57 55 59 -229 343 -227 228 -261 258 -289 258 -23 0 -38 -8 -57 -31z"
              />
              <path
                d="M2445 855 l-25 -24 0 -361 0 -361 25 -24 c32 -33 78 -33 110 0 l25
24 0 361 0 361 -25 24 c-15 16 -36 25 -55 25 -19 0 -40 -9 -55 -25z"
              />
            </g>
          </svg>
          <span>Mi Voz Escrita.</span>
        </Link>
        <div className="nav-items">
          <Link to="/" className="nav-item">
            <i className="fa-solid fa-house" />
            <p>Inicio</p>
          </Link>
          <Link to="/allblogs" className="nav-item">
            <i className="fa-solid fa-folder-open" />
            <p>Publicaciones</p>
          </Link>
          <div className="nav-item-search">
            <SearchDialog />
          </div>
          {admin ? (
            <Link to="/dashboard" className="nav-item">
              <img src="/profile.webp" alt="profile" draggable="false" />
            </Link>
          ) : (
            ""
          )}
        </div>
      </nav>
    </div>
  );
}
