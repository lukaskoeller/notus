import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SideNavProvider } from './contexts/sidenav.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OpenAPI } from './api/index.ts'

// Setting the correct environment based base url for the api.
OpenAPI.BASE = import.meta.env.VITE_APP_API_URL

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SideNavProvider>
        <App />
      </SideNavProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
