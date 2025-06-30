import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate 
} from "react-router";
import Dashboard from './components/Dashboard.jsx';
import AuthPage from './routes/Auth/AuthPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
  import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './components/AuthContext';
import DashboardMain from './components/DashboardMain.jsx';
import DashboardRaports from './components/DashboardRaports.jsx';


const queryClient = new QueryClient();



const AppRoutes = () => {

const {token, isLoading} = useAuth();

  if (isLoading) {
    return <div className='animate-spin'>Loading...</div>;
  }



// Components rendered conditionally based on the token is exist or not (user logged in or not)
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: token ? <Navigate to="/dashboard" /> : <AuthPage />
      },
      {
        path: "dashboard",
        element: token ? <Dashboard /> : <Navigate to="/login" />,
            children: [
          {
            index: true,
            element: <Navigate to="/dashboard/main" />
          },
           {
            path: "main",
            element: <DashboardMain />
          },
           {
            path: "raports",
            element: <DashboardRaports />
          }
        ]
      }
    ]
  },
]);
  return <RouterProvider router={router} />;
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
           <AuthProvider>
              <ToastContainer autoClose={2000} pauseOnHover={false}/>
                <AppRoutes />
            </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)

