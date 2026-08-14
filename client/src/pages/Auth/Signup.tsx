import { useState, type FormEvent } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import apiAxios from "../../api/apiAxios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { toast, Toaster } from "sonner";

export default function Signup() {
  const { theme } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return toast.warning("Password and Confirm password not the same");
    const reqBody = {
      firstName: firstName.trim().toLowerCase(),
      lastName: lastName.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password,
      confirmPassword,
    };

    try {
      const response = await apiAxios.post("/auth/signup", reqBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201)
        toast.success("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <title>Sign Up</title>

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
              Join us. Create a new account
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label
                className="block font-body-sm text-body-sm text-on-surface dark:text-surface mb-1"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                id="firstName"
                name="firstName"
                placeholder="your first name...."
                required
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block font-body-sm text-body-sm text-on-surface dark:text-surface mb-1"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                id="lastName"
                name="lastName"
                placeholder="your first name...."
                required
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

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
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword === false ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="border max-h-fit p-1  bg-surface-container-lowest rounded-sm text-sm cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword === false ? "show" : "hide"}
                </button>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  className="block font-body-sm text-body-sm text-on-surface dark:text-surface"
                  htmlFor="password"
                >
                  Confirm Password
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  id="confirmpassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  type={showPassword === false ? "password" : "text"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              className="w-full bg-primary text-on-primary rounded py-2.5 font-label-md text-label-md cursor-pointer hover:bg-primary-container transition-colors scale-95 active:scale-90 duration-150"
              type="submit"
            >
              Create Account
            </button>
          </form>
          <div className="mt-6 text-center border-t border-outline-variant pt-6">
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface mb-4">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="block w-full border border-outline-variant text-on-surface dark:text-surface dark:hover:text-on-surface rounded py-2.5 font-label-md text-label-md hover:bg-surface-container transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
