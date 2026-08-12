import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { MdInventory } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export default function Header() {
  const { auth, setAuth, theme, setTheme } = useAuth();
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const navigate = useNavigate();

  const setThemeMode = () => {
    if (theme === "dark") {
      setTheme("light");
      setShowSettings(false);
      localStorage.setItem("theme", JSON.stringify("light"));
    }
    if (theme === "light") {
      setTheme("dark");
      setShowSettings(false);
      localStorage.setItem("theme", JSON.stringify("dark"));
    }
  };

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem(auth);
    navigate("/");
  };

  return (
    <>
      {/** Not logged in Nav */}
      {!auth && (
        <header className={theme}>
          <nav className="sticky top-0 z-50 w-full border-b bg-surface dark:bg-on-surface">
            <div className="mx-auto flex max-w-container-max w-full items-center justify-between px-margin-desktop py-4">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2 text-primary dark:text-surface font-semibold text-xl"
              >
                <span className="text-2xl">
                  <MdInventory />
                </span>
                <span>Retail Pro</span>
              </Link>

              <div className="flex items-center gap-20">
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
            </div>
          </nav>
        </header>
      )}

      {/** Cashier Nav */}
      {auth && auth.role === "cashier" && (
        <header className="bg-surface  dark:bg-on-surface border-b border-outline-variant flex justify-between items-center w-full px-margin-desktop py-4 sticky top-0 z-50">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-primary dark:text-surface font-semibold text-xl"
            >
              <span className="text-2xl">
                <MdInventory />
              </span>
              <span>Retail Pro</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              {/* <!-- Assuming standard navigation for a dashboard app, adapting given JSON structure conceptually --> */}
              <Link
                to="/dashboard"
                className="text-on-surface-variant dark:text-surface font-label-md text-label-md hover:text-primary transition-colors duration-200"
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

          <div className="flex items-center gap-10">
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
              className="font-label-md  dark:text-surface dark:border-surface active:scale-95 cursor-pointer border px-4 py-2 rounded transition-colors flex items-center gap-2"
              onClick={handleLogout}
            >
              <FaPowerOff /> Logout
            </button>
          </div>
        </header>
      )}

      {/** Admin Nav */}
      {auth && auth.role === "admin" && (
        <header className="bg-surface dark:bg-on-surface border-b border-outline-variant flex justify-between items-center w-full px-margin-desktop py-4 sticky top-0 z-50">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-primary dark:text-surface font-semibold text-xl"
            >
              <span className="text-2xl">
                <MdInventory />
              </span>
              <span>Retail Pro</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 md:items-center">
            {/* <!-- Assuming standard navigation for a dashboard app, adapting given JSON structure conceptually --> */}
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
              className="text-primary dark:text-surface font-bold b-2 font-label-md pb-1 hover:scale-105 transition-all"
            >
              Sales
            </NavLink>
          </nav>

          <div className="flex items-center gap-10">
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
              className="font-label-md  dark:text-surface dark:border-surface active:scale-95 cursor-pointer border px-4 py-2 rounded transition-colors flex items-center gap-2"
              onClick={handleLogout}
            >
              <FaPowerOff /> Logout
            </button>
          </div>
        </header>
      )}
    </>
  );
}
