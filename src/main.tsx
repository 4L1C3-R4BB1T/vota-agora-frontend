import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import '@/global.scss';
import LoginPage from '@/pages/Login';
import LoginForm from '@/pages/Login/components/LoginForm';
import RegisterForm from '@/pages/Login/components/RegisterForm';
import HomePage from '@/pages/Home';
import DashboardPage from '@/pages/Dashboard';
import ProfilePage from '@/pages/Profile';
import WalletPage from '@/pages/Wallet';
import PublicConsultationViewPage from '@/pages/PublicConsultationView';
import PublicConsultationPage from '@/pages/PublicConsultation';
import CreatePublicConsultation from '@/pages/CreatePublicConsultation';
import 'react-toastify/dist/ReactToastify.css';

export interface BreadcrumbOptions {
  label: string;
  to: string;
}

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
        loader() {
          return {
            breadcrumbs: [
              {
                label: 'Página Inicial',
                to: '/home/dashboard', 
              },
            ] as BreadcrumbOptions[]
          };
        }
      },
      {
        path: 'profile',
        element: <ProfilePage/>,
        loader() {
          return {
            breadcrumbs: [
              {
                label: 'Página Inicial',
                to: '/home/dashboard', 
              },
              {
                label: 'Perfil',
                to: '/home/profile', 
              },
            ] as BreadcrumbOptions[]
          };
        }
      },
      {
        path: 'wallet',
        element: <WalletPage/>,
        loader() {
          return {
            breadcrumbs: [
              {
                label: 'Página Inicial',
                to: '/home/dashboard', 
              },
              {
                label: 'Minha carteira',
                to: '/home/wallet', 
              },
            ] as BreadcrumbOptions[]
          };
        }
      },
      {
        path: 'public-consultation-view',
        element: <PublicConsultationViewPage/>,
        loader() {
          return {
            breadcrumbs: [
              {
                label: 'Página Inicial',
                to: '/home/dashboard', 
              },
              {
                label: 'Visualizar Consulta Pública',
                to: '/home/public-consultation-view', 
              },
            ] as BreadcrumbOptions[]
          };
        }
      },
      {
        path: 'public-consultation',
        element: <PublicConsultationPage/>,
        loader() {
          return {
            breadcrumbs: [
              {
                label: 'Página Inicial',
                to: '/home/dashboard', 
              },
              {
                label: 'Consultas públicas',
                to: '/home/public-consultation', 
              },
            ] as BreadcrumbOptions[]
          };
        }
      },
      {
        path: 'create-public-consultation',
        element: <CreatePublicConsultation/>,
        loader() {
          return {
            breadcrumbs: [
              {
                label: 'Página Inicial',
                to: '/home/dashboard', 
              },
              {
                label: 'Nova Consulta pública',
                to: '/home/create-public-consultation', 
              },
            ] as BreadcrumbOptions[]
          };
        }
      }
    ],
  },
  {
    path: '',
    element: <Navigate to="/auth"/>
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
