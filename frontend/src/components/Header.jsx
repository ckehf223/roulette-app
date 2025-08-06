import { useEffect, useState } from "react";
import "/src/css/Header.css";

function Header() {
  const [today, setToday] = useState(null);
  const [day, setDay] = useState(null);

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

  return (
    <>
      <div className="HeaderDiv">
        <div className="header-container">
          <div className="header-wrap">
            <div>
              <img className="cursor-p" id="main-logo" src="/images/main-logo.jpg"></img>
            </div>
            <div className="dateDiv">
              <span className="todayString">{today}</span>
              <span className="dayString">({day})</span>
            </div>
          </div>
        </div>
        <div className="nav-container">
          <div className="nav-wrap">
            <div className="nav-itemBox">
              <div className="nav-item active">Roulette</div>
              <div className="nav-item">Record</div>
            </div>
            {/* <div className="nav-itemBox">
              <div className="nav-item">Login</div>
              <div className="nav-item">Logout</div>
            </div> */}
          </div>
        </div>
      </div>

    </>
  );
}

export default Header;
