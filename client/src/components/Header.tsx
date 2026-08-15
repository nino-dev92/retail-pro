import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { MdInventory, MdMenu } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import { IoClose, IoSettingsOutline } from "react-icons/io5";

export default function Header() {
  const { auth, setAuth, theme, setTheme } = useAuth();

  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      {/** Not logged in Nav */}
      {!auth && (
        <header className={`${theme} relative`}>
          <nav className="sticky top-0 z-50 w-full border-b bg-surface dark:bg-on-surface">
            <div className="mx-auto flex max-w-container-max w-full items-center justify-between px-3 sm:px-6 lg:px-margin-desktop py-3 sm:py-4">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-1.5 sm:gap-2 text-primary dark:text-surface font-semibold text-base sm:text-xl"
              >
                <span className="text-xl sm:text-2xl">
                  <MdInventory />
                </span>

                <span>Retail Pro</span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8 lg:gap-20">
                <div>
                  {!showSettings && (
                    <IoSettingsOutline
                      className="cursor-pointer dark:text-surface"
                      title="Settings"
                      size={20}
                      onClick={() => setShowSettings(true)}
                    />
                  )}

                  {showSettings && (
                    <div className="flex gap-5 dark:bg-on-surface">
                      <button
                        title="Light mode"
                        className="cursor-pointer text-xl"
                        onClick={() => {
                          setTheme("light");
                          setShowSettings(false);
                        }}
                      >
                        ☀️
                      </button>

                      <button
                        title="Dark mode"
                        className="cursor-pointer text-xl"
                        onClick={() => {
                          setTheme("dark");
                          setShowSettings(false);
                        }}
                      >
                        🌑
                      </button>
                    </div>
                  )}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                  <NavLink
                    to="/login"
                    className="rounded border border-outline-variant px-4 py-2 text-primary dark:text-surface transition-all duration-200 hover:bg-primary hover:text-on-primary active:scale-95"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className="rounded bg-primary px-4 py-2 text-on-primary transition-all duration-200 hover:opacity-90 active:scale-95"
                  >
                    Sign Up
                  </NavLink>
                </div>
              </div>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden text-primary dark:text-surface cursor-pointer p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <IoClose size={24} /> : <MdMenu size={26} />}
              </button>
            </div>

            {/* Mobile Overlay */}
            <div
              onClick={() => setMobileMenuOpen(false)}
              className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
                mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
            />

            {/* Mobile Slide-in Nav */}
            <div
              className={`md:hidden fixed right-0 top-0 z-50 h-full w-[80%] max-w-xs bg-surface dark:bg-on-surface shadow-2xl transition-transform duration-300 ease-in-out ${
                mobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between border-b border-outline-variant px-4 py-3">
                <div className="flex items-center gap-2 text-primary dark:text-surface font-semibold text-base">
                  <MdInventory className="text-xl" />

                  <span>Retail Pro</span>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded p-1 text-primary dark:text-surface hover:bg-primary/10"
                >
                  <IoClose size={24} />
                </button>
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-2 px-3 py-3">
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded border border-outline-variant px-3 py-2.5 text-center text-sm text-primary dark:text-surface hover:bg-primary hover:text-on-primary"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded bg-primary px-3 py-2.5 text-center text-sm text-on-primary hover:opacity-90"
                >
                  Sign Up
                </NavLink>
              </div>

              {/* Mobile Settings */}
              <div className="mx-3 border-t border-outline-variant pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant dark:text-surface">
                    Theme
                  </span>

                  <div className="flex gap-2">
                    <button
                      title="Light mode"
                      className="cursor-pointer rounded p-1 text-lg hover:bg-primary/10"
                      onClick={() => {
                        setTheme("light");
                        setMobileMenuOpen(false);
                      }}
                    >
                      ☀️
                    </button>

                    <button
                      title="Dark mode"
                      className="cursor-pointer rounded p-1 text-lg hover:bg-primary/10"
                      onClick={() => {
                        setTheme("dark");
                        setMobileMenuOpen(false);
                      }}
                    >
                      🌑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      )}

      {/** Cashier Nav */}
      {auth && auth.role === "cashier" && (
        <header className="bg-surface dark:bg-on-surface border-b border-outline-variant w-full sticky top-0 z-50">
          <div className="flex justify-between items-center w-full px-3 sm:px-6 lg:px-margin-desktop py-3 sm:py-4">
            {/* Logo */}
            <div className="flex gap-6 items-center">
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 sm:gap-2 text-primary dark:text-surface font-semibold text-base sm:text-xl"
              >
                <span className="text-xl sm:text-2xl">
                  <MdInventory />
                </span>

                <span>Retail Pro</span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex gap-6">
                <Link
                  to="/dashboard"
                  className="text-primary dark:text-surface font-label-md text-label-md hover:text-primary transition-colors duration-200"
                >
                  Dashboard
                </Link>

                <NavLink
                  to="/dashboard"
                  className="text-primary dark:text-surface border-b-2 border-primary font-bold pb-1 font-label-md text-label-md"
                >
                  Add Sale
                </NavLink>
              </nav>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              {!showSettings && (
                <IoSettingsOutline
                  className="cursor-pointer dark:text-surface"
                  title="Settings"
                  size={20}
                  onClick={() => setShowSettings(true)}
                />
              )}

              {showSettings && (
                <div className="flex gap-5 dark:bg-on-surface">
                  <button
                    title="Light mode"
                    className="cursor-pointer text-xl"
                    onClick={() => {
                      setTheme("light");
                      setShowSettings(false);
                    }}
                  >
                    ☀️
                  </button>

                  <button
                    title="Dark mode"
                    className="cursor-pointer text-xl"
                    onClick={() => {
                      setTheme("dark");
                      setShowSettings(false);
                    }}
                  >
                    🌑
                  </button>
                </div>
              )}

              <button
                className="font-label-md dark:text-surface dark:border-surface active:scale-95 cursor-pointer border px-4 py-2 rounded transition-colors flex items-center gap-2"
                onClick={handleLogout}
              >
                <FaPowerOff />
                Logout
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-primary dark:text-surface cursor-pointer p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <IoClose size={24} /> : <MdMenu size={26} />}
            </button>
          </div>

          {/* Mobile Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
              mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
          />

          {/* Mobile Slide-in Nav */}
          <div
            className={`md:hidden fixed right-0 top-0 z-50 h-full w-[80%] max-w-xs bg-surface dark:bg-on-surface shadow-2xl transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-outline-variant px-4 py-3">
              <div className="flex items-center gap-2 text-primary dark:text-surface font-semibold text-base">
                <MdInventory className="text-xl" />

                <span>Retail Pro</span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded p-1 text-primary dark:text-surface hover:bg-primary/10"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Cashier Links */}
            <nav className="flex flex-col gap-1 px-3 py-3">
              <NavLink
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded px-3 py-2.5 text-sm ${
                    isActive
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-on-surface-variant dark:text-surface hover:bg-primary/10"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded px-3 py-2.5 text-sm text-primary dark:text-surface hover:bg-primary/10"
              >
                Add Sale
              </NavLink>
            </nav>

            {/* Mobile Settings */}
            <div className="mx-3 border-t border-outline-variant pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant dark:text-surface">
                  Theme
                </span>

                <div className="flex gap-2">
                  <button
                    title="Light mode"
                    className="cursor-pointer rounded p-1 text-lg hover:bg-primary/10"
                    onClick={() => {
                      setTheme("light");
                      setMobileMenuOpen(false);
                    }}
                  >
                    ☀️
                  </button>

                  <button
                    title="Dark mode"
                    className="cursor-pointer rounded p-1 text-lg hover:bg-primary/10"
                    onClick={() => {
                      setTheme("dark");
                      setMobileMenuOpen(false);
                    }}
                  >
                    🌑
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Logout */}
            <div className="px-3">
              <button
                className="mt-3 w-full text-sm dark:text-surface dark:border-surface active:scale-95 cursor-pointer border px-3 py-2.5 rounded transition-colors flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <FaPowerOff size={14} />
                Logout
              </button>
            </div>
          </div>
        </header>
      )}

      {/** Admin Nav */}
      {auth && auth.role === "admin" && (
        <header className="bg-surface dark:bg-on-surface border-b border-outline-variant w-full sticky top-0 z-50">
          <div className="flex justify-between items-center w-full px-3 sm:px-6 lg:px-margin-desktop py-3 sm:py-4">
            {/* Logo */}
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 sm:gap-2 text-primary dark:text-surface font-semibold text-base sm:text-xl"
            >
              <span className="text-xl sm:text-2xl">
                <MdInventory />
              </span>

              <span>Retail Pro</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6 md:items-center">
              <NavLink
                to="/dashboard"
                className="text-primary dark:text-surface font-bold font-label-md pb-1 hover:scale-105 transition-all"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/users"
                className="text-primary dark:text-surface font-bold font-label-md pb-1 hover:scale-105 transition-all"
              >
                Cashiers
              </NavLink>

              <NavLink
                to="/products"
                className="text-primary dark:text-surface font-bold font-label-md pb-1 hover:scale-105 transition-all"
              >
                Products
              </NavLink>

              <NavLink
                to="/sales"
                className="text-primary dark:text-surface font-bold font-label-md pb-1 hover:scale-105 transition-all"
              >
                Sales
              </NavLink>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              {!showSettings && (
                <IoSettingsOutline
                  className="cursor-pointer dark:text-surface"
                  title="Settings"
                  size={20}
                  onClick={() => setShowSettings(true)}
                />
              )}

              {showSettings && (
                <div className="flex gap-5 dark:bg-on-surface">
                  <button
                    title="Light mode"
                    className="cursor-pointer text-xl"
                    onClick={() => {
                      setTheme("light");
                      setShowSettings(false);
                    }}
                  >
                    ☀️
                  </button>

                  <button
                    title="Dark mode"
                    className="cursor-pointer text-xl"
                    onClick={() => {
                      setTheme("dark");
                      setShowSettings(false);
                    }}
                  >
                    🌑
                  </button>
                </div>
              )}

              <button
                className="font-label-md dark:text-surface dark:border-surface active:scale-95 cursor-pointer border px-4 py-2 rounded transition-colors flex items-center gap-2"
                onClick={handleLogout}
              >
                <FaPowerOff />
                Logout
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-primary dark:text-surface cursor-pointer p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <IoClose size={24} /> : <MdMenu size={26} />}
            </button>
          </div>

          {/* Admin Mobile Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
              mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
          />

          {/* Admin Mobile Slide-in Nav */}
          <div
            className={`md:hidden fixed right-0 top-0 z-50 h-full w-[80%] max-w-xs bg-surface dark:bg-on-surface shadow-2xl transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-outline-variant px-4 py-3">
              <div className="flex items-center gap-2 text-primary dark:text-surface font-semibold text-base">
                <MdInventory className="text-xl" />

                <span>Retail Pro</span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded p-1 text-primary dark:text-surface hover:bg-primary/10"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Admin Links */}
            <nav className="flex flex-col gap-1 px-3 py-3">
              <NavLink
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-primary dark:text-surface hover:bg-primary/10"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/users"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-primary dark:text-surface hover:bg-primary/10"
                  }`
                }
              >
                Cashiers
              </NavLink>

              <NavLink
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-primary dark:text-surface hover:bg-primary/10"
                  }`
                }
              >
                Products
              </NavLink>

              <NavLink
                to="/sales"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-primary dark:text-surface hover:bg-primary/10"
                  }`
                }
              >
                Sales
              </NavLink>
            </nav>

            {/* Mobile Settings */}
            <div className="mx-3 border-t border-outline-variant pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant dark:text-surface">
                  Theme
                </span>

                <div className="flex gap-2">
                  <button
                    title="Light mode"
                    className="cursor-pointer rounded p-1 text-lg hover:bg-primary/10"
                    onClick={() => {
                      setTheme("light");
                      setMobileMenuOpen(false);
                    }}
                  >
                    ☀️
                  </button>

                  <button
                    title="Dark mode"
                    className="cursor-pointer rounded p-1 text-lg hover:bg-primary/10"
                    onClick={() => {
                      setTheme("dark");
                      setMobileMenuOpen(false);
                    }}
                  >
                    🌑
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Logout */}
            <div className="px-3">
              <button
                className="mt-3 w-full text-sm dark:text-surface dark:border-surface active:scale-95 cursor-pointer border px-3 py-2.5 rounded transition-colors flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <FaPowerOff size={14} />
                Logout
              </button>
            </div>
          </div>
        </header>
      )}

      {/**Manager Nav */}
      {auth && auth.role === "manager" && (
        <header className="bg-surface dark:bg-on-surface border-b border-outline-variant w-full sticky top-0 z-50">
          <div className="flex justify-between items-center w-full px-3 sm:px-6 lg:px-margin-desktop py-3 sm:py-4">
            {/* Logo */}
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 sm:gap-2 text-primary dark:text-surface font-semibold text-base sm:text-xl"
            >
              <span className="text-xl sm:text-2xl">
                <MdInventory />
              </span>

              <span>Retail Pro</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6 md:items-center">
              <NavLink
                to="/dashboard"
                className="text-primary dark:text-surface font-bold font-label-md pb-1 hover:scale-105 transition-all"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/users"
                className="text-primary dark:text-surface font-bold font-label-md pb-1 hover:scale-105 transition-all"
              >
                Staff
              </NavLink>

              <NavLink
                to="/products"
                className="text-primary dark:text-surface font-bold font-label-md pb-1 hover:scale-105 transition-all"
              >
                Products
              </NavLink>

              <NavLink
                to="/supplier"
                className="text-primary dark:text-surface font-bold font-label-md pb-1 hover:scale-105 transition-all"
              >
                Suppliers
              </NavLink>

              <NavLink
                to="/sales"
                className="text-primary dark:text-surface font-bold font-label-md pb-1 hover:scale-105 transition-all"
              >
                Sales
              </NavLink>

              <div className="group flex flex-col relative">
                <button className="text-primary dark:text-surface font-bold font-label-md pb-1 hover:scale-105 transition-all cursor-pointer">
                  Inventory
                </button>

                <div className="invisible opacity-0 absolute top-5 mt-2 flex min-w-44 flex-col gap-1 border border-outline-variant bg-surface-container-lowest dark:bg-on-surface text-on-surface dark:text-surface p-2 rounded-lg shadow-lg transition-all duration-400 group-hover:visible group-hover:opacity-100">
                  <Link
                    to="/purchase-orders"
                    className="px-3 py-2 rounded-md hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
                  >
                    Purchase Orders
                  </Link>

                  <Link
                    to="/stock"
                    className="px-3 py-2 rounded-md hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
                  >
                    Stock
                  </Link>

                  <Link
                    to="/stock-movement"
                    className="px-3 py-2 rounded-md hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
                  >
                    Stock Movement
                  </Link>

                  <Link
                    to="/refunds"
                    className="px-3 py-2 rounded-md hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
                  >
                    Refunds
                  </Link>
                </div>
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              {!showSettings && (
                <IoSettingsOutline
                  className="cursor-pointer dark:text-surface"
                  title="Settings"
                  size={20}
                  onClick={() => setShowSettings(true)}
                />
              )}

              {showSettings && (
                <div className="flex gap-5 dark:bg-on-surface">
                  <button
                    title="Light mode"
                    className="cursor-pointer text-xl"
                    onClick={() => {
                      setTheme("light");
                      setShowSettings(false);
                    }}
                  >
                    ☀️
                  </button>

                  <button
                    title="Dark mode"
                    className="cursor-pointer text-xl"
                    onClick={() => {
                      setTheme("dark");
                      setShowSettings(false);
                    }}
                  >
                    🌑
                  </button>
                </div>
              )}

              <button
                className="font-label-md dark:text-surface dark:border-surface active:scale-95 cursor-pointer border px-4 py-2 rounded transition-colors flex items-center gap-2"
                onClick={handleLogout}
              >
                <FaPowerOff />
                Logout
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-primary dark:text-surface cursor-pointer p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <IoClose size={24} /> : <MdMenu size={26} />}
            </button>
          </div>

          {/* Admin Mobile Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
              mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
          />

          {/* Admin Mobile Slide-in Nav */}
          <div
            className={`md:hidden fixed right-0 top-0 z-50 h-full w-[80%] max-w-xs bg-surface dark:bg-on-surface shadow-2xl transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-outline-variant px-4 py-3">
              <div className="flex items-center gap-2 text-primary dark:text-surface font-semibold text-base">
                <MdInventory className="text-xl" />

                <span>Retail Pro</span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded p-1 text-primary dark:text-surface hover:bg-primary/10"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Admin Links */}
            <nav className="flex flex-col gap-1 px-3 py-3">
              <NavLink
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-primary dark:text-surface hover:bg-primary/10"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/users"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-primary dark:text-surface hover:bg-primary/10"
                  }`
                }
              >
                Staff
              </NavLink>

              <NavLink
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-primary dark:text-surface hover:bg-primary/10"
                  }`
                }
              >
                Products
              </NavLink>

              <NavLink
                to="/supplier"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-primary dark:text-surface hover:bg-primary/10"
                  }`
                }
              >
                Suppliers
              </NavLink>

              <NavLink
                to="/sales"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-primary dark:text-surface hover:bg-primary/10"
                  }`
                }
              >
                Sales
              </NavLink>

              {/* Inventory */}
              <div
                className="mt-1"
                onMouseEnter={() => setInventoryOpen(true)}
                onMouseLeave={() => setInventoryOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setInventoryOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between rounded px-3 py-2.5 text-sm font-semibold text-primary dark:text-surface hover:bg-primary/10 transition-colors"
                >
                  <span>Inventory</span>

                  <span
                    className={`transition-transform duration-200 ${
                      inventoryOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                <div
                  className={`ml-3 border-l border-outline-variant pl-2 overflow-hidden transition-all duration-200 ${
                    inventoryOpen
                      ? "max-h-96 opacity-100 mt-1"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <NavLink
                    to="/purchase-orders"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setInventoryOpen(false);
                    }}
                    className={({ isActive }) =>
                      `block rounded px-3 py-2.5 text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-on-primary font-semibold"
                          : "text-primary dark:text-surface hover:bg-primary/10"
                      }`
                    }
                  >
                    Purchase Orders
                  </NavLink>

                  <NavLink
                    to="/stock"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setInventoryOpen(false);
                    }}
                    className={({ isActive }) =>
                      `block rounded px-3 py-2.5 text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-on-primary font-semibold"
                          : "text-primary dark:text-surface hover:bg-primary/10"
                      }`
                    }
                  >
                    Stock
                  </NavLink>

                  <NavLink
                    to="/stock-movement"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setInventoryOpen(false);
                    }}
                    className={({ isActive }) =>
                      `block rounded px-3 py-2.5 text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-on-primary font-semibold"
                          : "text-primary dark:text-surface hover:bg-primary/10"
                      }`
                    }
                  >
                    Stock Movement
                  </NavLink>

                  <NavLink
                    to="/refunds"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setInventoryOpen(false);
                    }}
                    className={({ isActive }) =>
                      `block rounded px-3 py-2.5 text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-on-primary font-semibold"
                          : "text-primary dark:text-surface hover:bg-primary/10"
                      }`
                    }
                  >
                    Refunds
                  </NavLink>
                </div>
              </div>
            </nav>

            {/* Mobile Settings */}
            <div className="mx-3 mt-1 border-t border-outline-variant pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant dark:text-surface">
                  Theme
                </span>

                <div className="flex gap-2">
                  <button
                    title="Light mode"
                    className="cursor-pointer rounded p-1 text-lg hover:bg-primary/10"
                    onClick={() => {
                      setTheme("light");
                      setMobileMenuOpen(false);
                    }}
                  >
                    ☀️
                  </button>

                  <button
                    title="Dark mode"
                    className="cursor-pointer rounded p-1 text-lg hover:bg-primary/10"
                    onClick={() => {
                      setTheme("dark");
                      setMobileMenuOpen(false);
                    }}
                  >
                    🌑
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Logout */}
            <div className="px-3">
              <button
                className="mt-3 w-full text-sm dark:text-surface dark:border-surface active:scale-95 cursor-pointer border px-3 py-2.5 rounded transition-colors flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <FaPowerOff size={14} />
                Logout
              </button>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
