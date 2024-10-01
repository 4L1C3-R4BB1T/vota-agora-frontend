import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './global.scss';
import Login from './pages/Login';
import LoginForm from './pages/Login/components/LoginForm';
import RegisterForm from './pages/Login/components/RegisterForm';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';


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
    path: '',
    element: <Home/>,
    children: [
      {
        element: <Dashboard/>,
        index: true
      },
    ],
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
