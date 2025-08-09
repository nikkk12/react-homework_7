import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CountryInfo } from './pages/CountryInfo.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/country",
    element : <CountryInfo />
  },
  {
    path: "/country/:countryName",
    element: <CountryInfo />
  }
])

createRoot(document.getElementById('root')!).render(
 <RouterProvider router={router} />
)
