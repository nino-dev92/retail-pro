import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between p-2 bg-blue-600 text-white">
      <div>Logo</div>
      <div className="flex gap-3 cursor-pointer">
        <Link
          to="/login"
          className="hover:text-red-500 transition-all duration-200"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="hover:text-red-500 transition-all duration-200"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}
