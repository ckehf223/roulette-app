import { useEffect, useState } from "react";
import { getWeatherIcon } from "../common/weather";
import { getKrDate } from "../utils/dateUtils";

function Weather() {
  const [temp, setTemp] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("/.netlify/functions/weather");
        const result = await response.json();
        const items = result.response.body.items.item;

        console.log(result);

        const sky = items.find(i => i.category === "SKY")?.fcstValue;
        const pty = items.find(i => i.category === "PTY")?.fcstValue;
        const t1h = items.find(i => i.category === "T1H")?.fcstValue + '℃';

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
      <div className="weather-temp">{temp}</div>
    </div>
  );
}

export default Weather;