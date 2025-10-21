import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultoptions: {
    queries: {
      refetchOnWindowFocus: false, // 탭 전환 시 자동 리패치 방지
      retry: 1,                    // 실패 시 재시도 횟수
      staleTime: 1000 * 60 * 5,    // 캐시 유지 시간
    },
  }
})


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
)
