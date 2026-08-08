import { NavLink, Link } from "react-router-dom";
import { MdInventory } from "react-icons/md";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { theme, setTheme } = useAuth();

  const setThemeMode = () => {
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
  };

  return (
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

          {/* Navigation */}
          {/* <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
          >
            About
          </a>
        </div> */}

          <div className="flex items-center gap-20">
            <div>
              <button
                title={
                  theme === "dark"
                    ? "Change to Light mode"
                    : "Change to dark mode"
                }
                className="cursor-pointer text-xl"
                onClick={setThemeMode}
              >
                {theme === "dark" ? "☀️" : "🌑"}
              </button>
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
  );
}
