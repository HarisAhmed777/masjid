import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {QueryClientProvider ,QueryClient} from '@tanstack/react-query'
import './index.css'

const queryclient = new QueryClient();

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <QueryClientProvider client={queryclient}> 
    <App />
    </QueryClientProvider>
  </StrictMode>,
)
