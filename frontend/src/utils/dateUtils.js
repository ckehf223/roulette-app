export function getKoreanDate(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);

  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formatter.format(d);
}

export function getKrDate(formatType = "default",date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);

  const offsetDate = new Date(d.getTime() + 9 * 60 * 60 * 1000);

  const year = offsetDate.getUTCFullYear();
  const month = String(offsetDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(offsetDate.getUTCDate()).padStart(2, "0");
  const hours = String(offsetDate.getUTCHours()).padStart(2, "0");
  const minutes = String(offsetDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(offsetDate.getUTCSeconds()).padStart(2, "0");

  switch (formatType) {
    case "yyyy":
      return `${year}`;
    case "yyyyMM":
      return `${year}${month}`;
    case "yyyyMMdd":
      return `${year}${month}${day}`;
    case "yyyyMMddHHmm":
      return `${year}${month}${day}${hours}${minutes}`;
    case "yyyyMMddHHmmss":
      return `${year}${month}${day}${hours}${minutes}${seconds}`;
    case "date": 
      return `${year}.${month}.${day}`;
    case "time": 
      return `${hours}:${minutes}:${seconds}`;
    case "compact": 
      return `${year}${month}${day}`;
    case "ko":
      return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
    case "iso":
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+09:00`;
    default:
      return `${year}${month}${day}`;
  }
  
}
