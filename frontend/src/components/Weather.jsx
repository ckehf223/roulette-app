import { useEffect, useState } from "react";
import { getKrDate } from "../utils/dateUtils";
import { getWeatherIcon } from "../common/weather";

function Weather() {
  const [temp, setTemp] = useState(0);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const baseDate = getKrDate("yyyyMMdd");
      const baseTime = getKrDate("HHmm");
      try {
        const serviceKey = "Yb3NKUnIpEeSIOB1CSCBVejjCCvTaFdfriGq9HHhXFF+bYctN4Cyd08YQ0Iu/rFBv7w//tRVvd+RFs39oU8HZw==";
        const encodedKey = encodeURIComponent(serviceKey); // 반드시 인코딩!
        const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${encodedKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=60&ny=127`;

        const response = await fetch(url);
        const result = await response.json(); // JSON 응답 받기
        const items = result.response.body.items.item;

        console.log(result);

        const sky = items.find(i => i.category === "SKY")?.fcstValue;
        const pty = items.find(i => i.category === "PTY")?.fcstValue;
        const t1h = items.find(i => i.category === "T1H")?.fcstValue;

        setIcon(getWeatherIcon(sky, pty));
        setTemp(t1h);

      } catch (error) {
        console.error("API 호출 실패:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="weather-box">
      <div className="weather-icon">{icon}</div>
      <div className="weather-temp">{temp}℃</div>
    </div>
  );
}

export default Weather;