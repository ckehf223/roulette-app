import { useEffect, useState } from "react";
import "/src/css/Header.css";
import { useAuth } from '/src/common/AuthContext'
import { useLocation, useNavigate } from "react-router-dom";
import Weather from "./Weather";

function Header() {
  const location = useLocation();

  const getIndexFromPath = (path) => {
    switch (path) {
      case "/":
        return 0;
      case "/his":
        return 1;
      case "/login":
        return 2;
      case "/join":
        return 3;
      default:
        return 0;
    }
  };


  const [today, setToday] = useState(null);
  const [day, setDay] = useState(null);
  const [activeIndex, setActiveIndex] = useState(getIndexFromPath(location.pathname));
  const { isAuthenticated, logout } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    setActiveIndex(getIndexFromPath(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const day = days[today.getDay()];

    setDay(day);
    setToday(`${year}.${month}.${date} `);
  }, []);

  const handleClick = (index, path) => {
    setActiveIndex(index);
    nav(path);
  };

  return (
    <>
      <div className="HeaderDiv">
        <div className="header-container">
          <div className="header-wrap">
            <div>
              <div className="cursor-p" id="main-logo" onClick={() => handleClick(0, '/')}></div>
            </div>
            <div className="dateDiv">
              <span className="todayString">{today}</span>
              <span className="dayString">({day})</span>
            </div>
            {/* <Weather /> */}
          </div>
        </div>
        <div className="nav-container">
          <div className="nav-wrap">
            <div className="nav-itemBox">
              <div className={`nav-item ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleClick(0, '/')}>Roulette</div>
              <div className={`nav-item ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleClick(1, '/his')}>Record</div>
            </div>
            <div className="nav-itemBox">
              {isAuthenticated ?
                (<div className="nav-item" onClick={() => logout()}>Logout</div>)
                :
                (<div className={`nav-item ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleClick(2, '/login')}>Login</div>)
              }
              {!isAuthenticated && (<div className={`nav-item ${activeIndex === 3 ? 'active' : ''}`} onClick={() => handleClick(3, '/join')}>Join</div>)}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Header;
