import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './global.scss';
import Login from './pages/Login';
import LoginForm from './pages/Login/components/LoginForm';
import RegisterForm from './pages/Login/components/RegisterForm';
import Home from './pages/Home';


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
    element: <Home/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
