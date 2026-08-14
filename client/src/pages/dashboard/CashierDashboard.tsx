import { useEffect, useState, useMemo } from "react";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ProductsGrid from "../../components/product/ProductsGrid";
import SummaryCard from "../../components/product/SummaryCard";
import ProductCategory from "../../components/product/ProductCategory";
import Modal from "../../components/ConfirmSaleModal";
import { Toaster, toast } from "sonner";
import type { Product, CartItem, Category } from "../../types/types";
import SearchBar from "../../components/SearchBar";
import Spinner from "../../utils/Spinner";

export default function CashierDashboard() {
  const { auth, theme, isLoading, setIsLoading } = useAuth();
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
  //const lastTransaction = todaySales.at(-1);
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
      const response = await api.get(`/sales/${auth.id}`);
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
    setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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

  const addToCart = (product: Product) => {
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
      const response = await api.post("/sales", saleItems);

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
      {isLoading && <Spinner />}

      {!isLoading && (
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
            <div className="flex justify-between items-center px-4 sm:px-10 gap-2 sm:gap-6 mt-4 max-w-container-max mx-auto w-full">
              <p className="dark:text-surface text-center">
                <b className="text-lg">Welcome</b>{" "}
                {auth.firstName.toUpperCase()} {auth.lastName.toUpperCase()}
              </p>

              <p className="dark:text-surface font-bold text-center">
                {new Date().toDateString()}
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

                    <SearchBar search={search} setSearch={setSearch} />
                  </div>

                  {/** Category component */}
                  <ProductCategory
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                </div>

                {/* Product Grid */}
                <ProductsGrid
                  filteredProducts={filteredProducts}
                  addToCart={addToCart}
                />
              </section>

              {/* Right Column: Cart & Summary */}
              <section className="w-full lg:w-100 flex flex-col gap-6 shrink-0 min-h-150 lg:min-h-0">
                {/* Context Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <SummaryCard title="Today's Sales" value={salesTotal} />
                  <SummaryCard title="Transactions" value={todaySales.length} />
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
