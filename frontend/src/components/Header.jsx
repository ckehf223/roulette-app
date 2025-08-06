import { useEffect, useState } from "react"


function Header() {
  const [today, setToday] = useState(null);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    setToday(`${year}년 ${month}월 ${date}일`);
  }, []);

  return (
    <>
      <div id="header-container" className="d-flex gap-2 mt-2 p-2 flex-column align-items-center justify-content-center">
        <div><img className="cursor-p" src="/images/main-logo.jpg"></img></div>
        <span className="fw-bold fs-4">{today}</span>
        <h3 id="mainTitle">오늘 뭐먹지?</h3>
      </div>

    </>
  )
}

export default Header