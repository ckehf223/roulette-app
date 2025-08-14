import { useEffect, useState } from 'react';
import instance from '/src/auth/axios';
import '/src/css/Resulthis.css';
import { getKrDate } from "/src/utils/dateUtils";


function Resulthis() {
  const [hisList, setHisList] = useState([]);

  useEffect(() => {
    getHistoryList();
  }, []);

  const getHistoryList = async () => {
    let baseDate = getKrDate('yyyyMM');
    try {
      const response = await instance.get(`/result/his/find?baseDate=${baseDate}`);
      setHisList(response.data);
    } catch (error) {
      setHisList([]);
      console.error("기록 로딩중 에러 발생" + error);
    }
  }

  return (
    <>
      <div className="resultArea">
        <div className='result-grid-box'>
          {hisList.map((o, idx) => (
            <div key={idx} className='result-grid'>
              <p className='result-title'>{o.result}</p>
              <p className='result-date'>{o.reqDate}</p>
              <p className='result-wirter'>사용자: {o.userId}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Resulthis;