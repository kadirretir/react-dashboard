import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate 
} from "react-router";
import MainDashboard from './components/MainDashboard.jsx';
import AuthPage from './routes/Auth/AuthPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" />
      },
      {
        path: "login",
        element: <AuthPage />
      },
      {
        path: "dashboard",
        element: <MainDashboard />
      }
    ]
  },
]);



createRoot(document.getElementById("root")).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>
)

