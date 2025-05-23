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
import ErrorPage from './components/ErrorPage.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
  import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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

    <QueryClientProvider client={queryClient}>
        <ToastContainer autoClose={2000} pauseOnHover={false}
 />
       <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)

