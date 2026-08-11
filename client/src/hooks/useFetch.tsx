import useAxiosPrivate from "./useAxiosPrivate";

export default function useFetch() {
  const api = useAxiosPrivate();

  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await api.get("/users");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await api.get("/category");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getSales = async () => {
    try {
      const response = await api.get("/sales");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getInventoryAdjustment = async () => {
    try {
      const response = await api.get("/inventory-adjustment");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getSuppliers = async () => {
    try {
      const response = await api.get("/suppliers");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getProducts,
    getUsers,
    getCategories,
    getSales,
    getSuppliers,
    getInventoryAdjustment,
  };
}
