import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
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
               const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/token`, { withCredentials: true });
               setToken(response.data.accessToken);
            } catch {
          
                setToken(null)
            } finally {
              setIsLoading(false);
            }
    }
    fetchMe()
   
    }, [])

 useEffect(() => {
  const interceptor = axios.interceptors.request.use(config => {
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return () => axios.interceptors.request.eject(interceptor);
}, [token]);



  useEffect(() => {
  const interceptor = axios.interceptors.response.use(
    res => res,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        error.response.data.message === 'Unauthorized'
      ) {
        originalRequest._retry = true;
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/token`, { withCredentials: true });
          setToken(response.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return axios(originalRequest);
        } catch (err) {
          setToken(null);
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );
  return () => {
    axios.interceptors.response.eject(interceptor);
  };
}, []);


      return (
    <AuthContext value={{ token, setToken, isLoading}}>
      {children}
    </AuthContext>
  );
};
