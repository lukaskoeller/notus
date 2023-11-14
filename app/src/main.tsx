import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SideNavProvider } from './contexts/sidenav.tsx'

// Setting the correct environment based base url for the api.
OpenAPI.BASE = import.meta.env.VITE_APP_API_URL

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SideNavProvider>
      <App />
    </SideNavProvider>
  </React.StrictMode>,
)
