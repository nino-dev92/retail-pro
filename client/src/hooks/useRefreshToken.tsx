import apiAxios from "../api/apiAxios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await apiAxios.get("/auth/refresh");

    const newAccessToken = response.data?.accessToken;

    setAuth((prev: any) => {
      return { ...prev, accessToken: newAccessToken };
    });
    return newAccessToken;
  };

  return refresh;
};

export default useRefreshToken;
