export const getWeatherIcon = (sky, pty) => {
  if (pty !== "0") {
    switch (pty) {
      case "1": return "🌧️"; // 비
      case "2": return "🌧️❄️"; // 비/눈
      case "3": return "❄️"; // 눈
      case "4": return "⛈️"; // 소나기
      default: return "🌦️"; // 기타
    }
  } else {
    switch (sky) {
      case "1": return "☀️"; // 맑음
      case "3": return "⛅"; // 구름 많음
      case "4": return "☁️"; // 흐림
      default: return "❓";
    }
  }
};