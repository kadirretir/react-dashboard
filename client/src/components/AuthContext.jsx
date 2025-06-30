import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                 const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/login`);
             
                setToken(response.data.accessToken)
            } catch {
                setToken(null)
            } finally {
              setIsLoading(false);
            }
    }
    fetchMe()
   
    }, [])

    useLayoutEffect(() => {
        const authInterceptor = axios.interceptors.request.use((config) => {
            config.headers.Authorization = 
            !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
            return config;
        });

        return () => {
            axios.interceptors.request.eject(authInterceptor)
        }

    },[token])

    useLayoutEffect(() => {
     const refreshInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if(error.response.status === 401 && error.response.data.message === 'Unauthorized') {
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/token`)

            setToken(response.data.accessToken)

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
            originalRequest._retry = true;

            return axios(originalRequest)
          } catch {
            setToken(null)
          }
return Promise.reject(error)
          }

        })
       return () => {
        axios.interceptors.response.eject(refreshInterceptor)
       }
    }, [])


      return (
    <AuthContext value={{ token, setToken, isLoading}}>
      {children}
    </AuthContext>
  );
};
