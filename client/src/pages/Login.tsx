import { useState, type FormEvent } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import apiAxios from "../api/apiAxios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast, Toaster } from "sonner";

export default function Login() {
  const { theme, auth, setAuth, setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handlelogin = async (e: FormEvent) => {
    e.preventDefault();
    const reqBody = { email, password };

    try {
      const response = await apiAxios.post("/auth/login", reqBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const authResponse = response?.data?.data;
      setAuth(authResponse);

      localStorage.setItem("auth", JSON.stringify(auth));
      setEmail("");
      setPassword("");
      toast.success("Login Successful");
      setIsLoggedIn(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors={true} />
      <Header />
      <main
        className={` ${theme}  dark:bg-slate-900 min-h-screen flex grow items-center justify-center p-margin-mobile md:p-margin-desktop`}
      >
        <div className="w-full max-w-md dark:bg-slate-800 bg-surface-container-lowest border border-outline-variant rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="font-headline-lg text-headline-lg text-primary dark:text-surface text-3xl mb-2">
              Retail Pro
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface">
              Sign in to your account to continue
            </p>
          </div>
          <form className="space-y-6" onSubmit={handlelogin}>
            <div>
              <label
                className="block font-body-sm text-body-sm text-on-surface dark:text-surface mb-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                id="email"
                name="email"
                placeholder="user@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  className="block font-body-sm text-body-sm text-on-surface dark:text-surface"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  className="font-label-sm text-label-sm text-primary dark:text-surface hover:underline"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-primary text-on-primary rounded py-2.5 font-label-md text-label-md cursor-pointer hover:bg-primary-container transition-colors scale-95 active:scale-90 duration-150"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center border-t border-outline-variant pt-6">
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface mb-4">
              Don't have an account?
            </p>
            <Link
              to="/signup"
              className="block w-full border border-outline-variant text-on-surface dark:text-surface dark:hover:text-on-surface rounded py-2.5 font-label-md text-label-md hover:bg-surface-container transition-colors"
            >
              Create an account
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
