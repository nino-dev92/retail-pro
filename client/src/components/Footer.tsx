import { MdInventory } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant flat no shadows">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-desktop py-gutter max-w-container-max mx-auto gap-6 md:gap-0">
        <div className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined">
            <MdInventory />
          </span>
          Retail Pro
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/dashboard"
            className="font-label-sm text-label-sm text-on-surface-variant hover:underline transition-all opacity-80 hover:opacity-100"
          >
            Privacy Policy
          </Link>
          <Link
            to="/dashboard"
            className="font-label-sm text-label-sm text-on-surface-variant hover:underline transition-all opacity-80 hover:opacity-100"
          >
            Terms of Service
          </Link>

          <Link
            to="/dashboard"
            className="font-label-sm text-label-sm text-on-surface-variant hover:underline transition-all opacity-80 hover:opacity-100"
          >
            About
          </Link>
        </div>
        <div className="font-body-sm text-body-sm text-on-surface-variant">
          © {new Date().getFullYear()} Retail Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
