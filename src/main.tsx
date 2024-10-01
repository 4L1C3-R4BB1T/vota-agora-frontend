import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './global.scss';
import Login from './pages/Login';
import LoginForm from './pages/Login/components/LoginForm';
import RegisterForm from './pages/Login/components/RegisterForm';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import PublicConsultationView from './pages/PublicConsultationView';
import PublicConsultation from './pages/PublicConsultation';


const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Login/>,
    children: [
      {
        element: <LoginForm/>,
        index: true,
      },
      {
        path: 'register',
        element: <RegisterForm/>
      }
    ],
  },
  {
    path: 'home',
    element: <Home/>,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard/>,
      },
      {
        path: 'profile',
        element: <Profile/>
      },
      {
        path: 'wallet',
        element: <Wallet/>
      },
      {
        path: 'public-consultation-view',
        element: <PublicConsultationView/>
      },
      {
        path: 'public-consultation',
        element: <PublicConsultation/>
      }
    ],
  },
  {
    path: '',
    element: <Navigate to="/home/dashboard"/>
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
