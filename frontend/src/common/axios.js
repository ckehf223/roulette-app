import axios from 'axios';

// 환경변수에서 기본 API URL 가져오기
const BASE_URL = 'http://13.209.15.193:8080/api';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 요청 타임아웃 (선택)
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (선택)
instance.interceptors.request.use(
  (config) => {
    // 예: 토큰 자동 추가
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (선택)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // 전역 에러 처리
//     console.error('API 요청 에러:', error);
//     return Promise.reject(error);
//   }
// );

export default instance;
