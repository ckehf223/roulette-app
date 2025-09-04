import { getKrDate } from "../../src/utils/dateUtils";

export async function handler(event, context) {
  const baseDate = getKrDate("yyyyMMdd");
  let baseTime = "";
  const hours = getKrDate("HH");
  const minutes = getKrDate("mm");
  if (parseInt(minutes, 10) >= 30) {
    baseTime = hours + "30";
  } else {
    baseTime = (parseInt(hours, 10) - 1) + "30";
  }

  const serviceKey = process.env.WEATHER_API_KEY;
  const encodedKey = encodeURIComponent(serviceKey); // 반드시 인코딩!
  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${encodedKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=60&ny=127`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}