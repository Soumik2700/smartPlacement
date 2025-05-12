import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Register from './components/Register.jsx';
import HeroSection from './components/HeroSection.jsx';

const appRouter = createBrowserRouter([
  {
    path:"/",
    element: <LandingPage />,
    children:[
      {
        path:"",
        element:<HeroSection/>
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Register />
      }
    ]
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)
