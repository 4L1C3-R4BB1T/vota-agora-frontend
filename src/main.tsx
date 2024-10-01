import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './global.scss';
import LoginPage from './pages/Login';
import LoginForm from './pages/Login/components/LoginForm';
import RegisterForm from './pages/Login/components/RegisterForm';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import WalletPage from './pages/Wallet';
import PublicConsultationViewPage from './pages/PublicConsultationView';
import PublicConsultationPage from './pages/PublicConsultation';
import CreatePublicConsultation from './pages/CreatePublicConsultation';


const router = createBrowserRouter([
  {
    path: '/auth',
    element: <LoginPage/>,
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
    element: <HomePage/>,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage/>,
      },
      {
        path: 'profile',
        element: <ProfilePage/>
      },
      {
        path: 'wallet',
        element: <WalletPage/>
      },
      {
        path: 'public-consultation-view',
        element: <PublicConsultationViewPage/>
      },
      {
        path: 'public-consultation',
        element: <PublicConsultationPage/>
      },
      {
        path: 'create-public-consultation',
        element: <CreatePublicConsultation/>
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
