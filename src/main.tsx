import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CountryInfo } from './pages/CountryInfo.tsx'
import { FilteredContinents } from './pages/FilteredContinents.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/country",
    element: <CountryInfo />
  },
  {
    path: "/continent",
    element: <FilteredContinents />
  }
])

createRoot(document.getElementById('root')!).render(
 <RouterProvider router={router} />
)
