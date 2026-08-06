import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import apiAxios from "../api/apiAxios";
import type { InternalAxiosRequestConfig } from "axios";

function useAxiosPrivate() {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept: any = apiAxios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (auth?.accessToken) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }

        return config;
      },
      (err: any) => Promise.reject(err),
    );

    const responseIntercept: any = apiAxios.interceptors.response.use(
      (response) => response,
      async (error: any) => {
        const prevRequest = error?.config as InternalAxiosRequestConfig & {
          sent?: boolean;
        };

        if (error?.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const accessToken = await refresh();

          setAuth((prev: any) => {
            return { ...prev, accessToken };
          });

          prevRequest.headers.Authorization = `Bearer ${accessToken}`;

          return apiAxios(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      apiAxios.interceptors.request.eject(requestIntercept);
      apiAxios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
}

export default useAxiosPrivate;
