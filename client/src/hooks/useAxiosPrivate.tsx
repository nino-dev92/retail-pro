import { useEffect, useRef } from "react";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import apiAxios from "../api/apiAxios";

type RetryRequestConfig = InternalAxiosRequestConfig & { sent?: boolean };

function useAxiosPrivate() {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();
  const authRef = useRef(auth); // Keep the ref synchronized with the latest auth state
  //
  useEffect(() => {
    authRef.current = auth;
  }, [auth]);
  useEffect(() => {
    const requestIntercept = apiAxios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = authRef.current?.accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
    const responseIntercept = apiAxios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error.config as RetryRequestConfig | undefined;
        if (
          error.response?.status === 401 &&
          prevRequest &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true;
          try {
            const accessToken = await refresh();
            setAuth((prev: any) => ({ ...prev, accessToken }));
            prevRequest.headers.Authorization = `Bearer ${accessToken}`;
            return apiAxios(prevRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
    return () => {
      apiAxios.interceptors.request.eject(requestIntercept);
      apiAxios.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, setAuth]);
  return apiAxios;
}

export default useAxiosPrivate;

// import { useEffect } from "react";
// import useAuth from "./useAuth";
// import useRefreshToken from "./useRefreshToken";
// import apiAxios from "../api/apiAxios";
// import type { InternalAxiosRequestConfig } from "axios";

// function useAxiosPrivate() {
//   const { auth, setAuth } = useAuth();
//   const refresh = useRefreshToken();

//   useEffect(() => {
//     const requestIntercept: any = apiAxios.interceptors.request.use(
//       (config: InternalAxiosRequestConfig) => {
//         if (auth?.accessToken) {
//           config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
//         }

//         return config;
//       },
//       (err: any) => Promise.reject(err),
//     );

//     const responseIntercept: any = apiAxios.interceptors.response.use(
//       (response) => response,
//       async (error: any) => {
//         const prevRequest = error?.config as InternalAxiosRequestConfig & {
//           sent?: boolean;
//         };

//         if (error?.response?.status === 401 && !prevRequest.sent) {
//           prevRequest.sent = true;
//           const accessToken = await refresh();

//           setAuth((prev: any) => {
//             return { ...prev, accessToken };
//           });

//           prevRequest.headers.Authorization = `Bearer ${accessToken}`;

//           return apiAxios(prevRequest);
//         }
//         return Promise.reject(error);
//       },
//     );

//     return () => {
//       apiAxios.interceptors.request.eject(requestIntercept);
//       apiAxios.interceptors.response.eject(responseIntercept);
//     };
//   }, [auth, refresh]);

//   return apiAxios;
// }

// export default useAxiosPrivate;
