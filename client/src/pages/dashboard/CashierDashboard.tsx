import { useEffect, useState, useMemo } from "react";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Modal from "../../components/ConfirmSaleModal";
import { Toaster, toast } from "sonner";
import apiAxios from "../../api/apiAxios";
import type { Product } from "../../types/product";
import type { CartItem } from "../../types/cart";
import type { Category } from "../../types/category";

export default function CashierDashboard() {
  const { auth, theme } = useAuth();
  const api = useAxiosPrivate();
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [todaySales, setTodaySales] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastTransaction = todaySales.at(-1);
  const salesTotal = todaySales.reduce((total, item) => {
    return total + item.total;
  }, 0);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      // Search fields
      const name = product.name?.toLowerCase() ?? "";
      const sku = product.sku?.toLowerCase() ?? "";

      const matchesSearch =
        !query || name.includes(query) || sku.includes(query);

      // Category filter
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory._id;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const getSales = async () => {
    try {
      const response = await apiAxios.get(`/sales/${auth.id}`);
      const salesData = response?.data?.data || [];

      const today = new Date();

      const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );

      const startOfTomorrow = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
      );

      const todaysSales = salesData.filter((sale: any) => {
        const saleDate = new Date(sale.createdAt);

        return saleDate >= startOfToday && saleDate < startOfTomorrow;
      });

      setTodaySales(todaysSales);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response?.data?.data ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    const getCategories = async () => {
      try {
        const response = await api.get("/category");
        setCategories(response?.data?.data ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
    getCategories();
    getSales();
  }, []);

  useEffect(() => {
    const newSubtotal = cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    setSubtotal(newSubtotal);
    setTotal(newSubtotal);
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existingProduct = prev.find(
        (item) => item.product._id === product._id,
      );

      if (existingProduct) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  const handleAddQuantity = (item: any) => {
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem.product._id === item.product._id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem,
      ),
    );
  };

  const handleRemoveQuantity = (item: any) => {
    setCart((prev) =>
      prev
        .map((cartItem) =>
          cartItem.product._id === item.product._id
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };

  const completeSale = async () => {
    if (paymentMethod === "") {
      return toast.warning("Select payment method");
    }

    const items = cart.map((cartItem) => ({
      productId: cartItem.product._id,
      quantity: cartItem.quantity,
    }));

    const saleItems = {
      items,
      paymentMethod,
    };

    try {
      const response = await apiAxios.post("/sales", saleItems);

      if (response.status === 201) {
        toast.success("Sale Successful");
        setCart([]);
        setPaymentMethod("");
        setIsModalOpen(false);

        await getSales();
      }
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      toast.error(`Failed to complete sale: ${error?.response?.data?.message}`);
    }
  };

  return (
    <>
      <title>Dashboard</title>

      {auth.role === "cashier" && (
        <div
          className={`${theme} dark:bg-on-surface font-body-md text-body-md antialiased min-h-screen lg:h-screen flex flex-col lg:overflow-hidden`}
        >
          {/* Top Navigation */}
          <Header />
          <Toaster position="top-right" richColors={true} />

          {/** Confirmation Modal */}
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              completeSale={completeSale}
              setIsModalOpen={setIsModalOpen}
            />
          )}

          {/* Main Workspace */}
          <main className={` ${isModalOpen && "blur-sm"} `}>
            <div className="flex justify-end px-10 gap-gutter max-w-container-max mx-auto w-full">
              <p className="dark:text-surface pt-2">
                <b className="text-lg">Welcome</b>{" "}
                {auth.firstName.toUpperCase()} {auth.lastName.toUpperCase()}
              </p>
            </div>
            <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden p-margin-mobile md:p-margin-desktop gap-gutter max-w-container-max mx-auto w-full gap-4">
              {/* Left Column: Product Search & Grid */}
              <section className="flex-1 flex flex-col bg-surface-container-lowest dark:bg-on-surface border border-outline-variant rounded-lg overflow-hidden shrink-0 min-w-0 lg:min-w-125 min-h-125 lg:min-h-0">
                {/* Search & Filter Header */}
                <div className="p-4 md:p-6 border-b border-outline-variant bg-surface-bright flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <label className="text-outline dark:text-surface text-lg shrink-0">
                      Find a Product
                    </label>

                    <input
                      className="w-full p-3 bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md outline-none transition-all placeholder:text-on-surface-variant"
                      placeholder="Search by SKU, Name, or Barcode..."
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2 items-center">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(null)}
                      className={`whitespace-nowrap px-4 py-1.5 rounded-full font-label-sm text-label-sm font-bold border cursor-pointer transition-colors ${
                        selectedCategory === null
                          ? "bg-primary-container text-surface border-transparent"
                          : "bg-surface text-on-surface-variant border-outline-variant hover:border-primary"
                      }`}
                    >
                      All Categories
                    </button>

                    {categories.length < 1 ? (
                      <p className="dark:text-surface">No Category available</p>
                    ) : (
                      <div className="flex gap-2">
                        {categories.map((category) => (
                          <button
                            type="button"
                            key={category._id}
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full font-label-sm text-label-sm border transition-colors cursor-pointer ${
                              selectedCategory === category
                                ? "bg-primary-container text-surface border-transparent font-bold"
                                : "bg-surface text-on-surface-variant border-outline-variant hover:border-primary"
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-background dark:bg-on-surface">
                  {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <p className="text-lg font-semibold dark:text-surface">
                        No products found
                      </p>

                      <p className="text-sm text-on-surface-variant dark:text-surface">
                        Try a different search or category.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredProducts.map((product) => (
                        <div
                          key={product._id}
                          className="bg-surface dark:bg-primary border-outline-variant rounded p-4 hover:border-primary transition-all flex flex-col gap-3 group relative"
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                              {product.sku}
                            </span>

                            <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed-dim bg-opacity-20 px-2 py-0.5 rounded">
                              {product.quantity}
                            </span>
                          </div>

                          <div>
                            <h3 className="font-body-md text-body-md font-bold text-on-surface dark:text-surface line-clamp-2">
                              {product.name}
                            </h3>
                          </div>

                          <div className="mt-auto flex justify-between items-end pt-2 border-t border-surface-variant">
                            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-surface">
                              N{product.price}
                            </span>

                            <button
                              type="button"
                              onClick={() => addToCart(product)}
                              className="w-8 h-8 rounded px-10 bg-green-500 flex cursor-pointer items-center justify-center text-white active:scale-95 transition-colors"
                            >
                              add
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Right Column: Cart & Summary */}
              <section className="w-full lg:w-100 flex flex-col gap-6 shrink-0 min-h-150 lg:min-h-0">
                {/* Context Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface dark:bg-primary border border-outline-variant rounded p-4 flex flex-col gap-1 text-center">
                    <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-surface uppercase tracking-wider">
                      Today's Sales
                    </span>

                    <span className="font-headline-md text-headline-md font-bold text-primary dark:text-surface">
                      N{salesTotal}
                    </span>
                  </div>

                  <div className="bg-surface dark:bg-primary border border-outline-variant rounded p-4 flex flex-col gap-1 text-center">
                    <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-surface uppercase tracking-wider">
                      Transactions
                    </span>

                    <span className="font-headline-md text-headline-md font-bold text-on-surface dark:text-surface">
                      {todaySales.length}
                    </span>

                    <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-surface">
                      Last trans:{" "}
                      {lastTransaction
                        ? new Date(
                            lastTransaction.createdAt,
                          ).toLocaleTimeString()
                        : "No transactions"}
                    </span>
                  </div>
                </div>

                {/* Current Sale Cart */}
                <div className="flex-1 min-h-100 bg-surface dark:bg-primary border border-outline-variant rounded-lg flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-outline-variant bg-surface-bright flex justify-between items-center">
                    <h2 className="font-body-lg text-body-lg font-bold text-on-surface dark:text-surface">
                      Current Sale
                    </h2>

                    <button
                      className="font-label-sm text-label-sm text-error hover:underline cursor-pointer dark:text-surface active:scale-95 transition-all duration-200"
                      onClick={() => setCart([])}
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Cart Items List */}
                  <div className="flex-1 overflow-y-auto p-2">
                    {cart.length < 1 ? (
                      <p className="dark:text-surface">Cart is empty</p>
                    ) : (
                      <>
                        {cart.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 hover:bg-surface-container-low rounded group"
                            >
                              <div className="flex-1 flex flex-col min-w-0">
                                <span className="font-body-sm text-body-sm font-bold text-on-surface dark:text-surface truncate">
                                  {item.product.name}
                                </span>

                                <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-surface truncate">
                                  SKU: {item.product.sku}
                                </span>
                              </div>

                              <div className="flex flex-col items-end gap-2 shrink-0">
                                <div className="flex gap-3 sm:gap-5">
                                  <span className="font-body-sm text-body-sm font-bold text-primary dark:text-surface">
                                    N{item.product.price}
                                  </span>

                                  <span className="font-body-sm text-body-sm font-bold">
                                    x{item.quantity}
                                  </span>
                                </div>

                                <div className="flex items-end gap-6 sm:gap-5">
                                  <button
                                    className="w-6 h-6 flex items-center justify-center text-green-500 cursor-pointer active:scale-95"
                                    onClick={() => handleAddQuantity(item)}
                                  >
                                    add
                                  </button>

                                  <button
                                    className="w-6 h-6 flex items-center justify-center text-red-500 cursor-pointer active:scale-95"
                                    onClick={() => handleRemoveQuantity(item)}
                                  >
                                    remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>

                  {/* Checkout Summary Area */}
                  <div className="p-4 border-t border-outline-variant bg-surface dark:bg-on-surface flex flex-col gap-3 shrink-0">
                    <div className="flex justify-between items-center font-body-sm text-body-sm text-on-surface-variant dark:text-surface">
                      <span>Subtotal</span>
                      <span>{subtotal}</span>
                    </div>

                    <div className="flex justify-between items-center font-body-sm text-body-sm text-on-surface-variant dark:text-surface">
                      <span>Tax</span>
                      <span>0.00</span>
                    </div>

                    <div className="flex justify-between items-center font-body-sm text-body-sm text-on-surface-variant dark:text-surface">
                      <span>Discount</span>
                      <span className="text-error">0.00</span>
                    </div>

                    <div className="border-t border-outline-variant pt-3 mt-1 flex justify-between items-end">
                      <span className="font-body-lg text-body-lg font-bold text-on-surface dark:text-surface">
                        Total
                      </span>

                      <span className="font-headline-lg text-headline-lg font-bold text-primary dark:text-surface">
                        {total}
                      </span>
                    </div>

                    <div>
                      {/**Payment Method */}
                      <div className="flex gap-3">
                        <p className="dark:text-surface">Payment Method</p>
                        <select
                          className="dark:bg-surface border"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="CASH">Cash</option>
                          <option value="CARD">Card</option>
                          <option value="TRANSFER">Transfer</option>
                        </select>
                      </div>
                    </div>
                    <button
                      className="w-full mt-4 bg-primary text-on-primary py-4 rounded-lg font-bold hover:bg-primary-container transition-colors flex justify-center items-center gap-2 cursor-pointer active:scale-95"
                      onClick={() => {
                        if (cart.length < 1) {
                          return toast.warning("Cart is empty");
                        }
                        setIsModalOpen(true);
                      }}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
