import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState();

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await axios.get("/get/me");
                setToken(response.data.accessToken)
            } catch {
                setToken(null)
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
    
};
