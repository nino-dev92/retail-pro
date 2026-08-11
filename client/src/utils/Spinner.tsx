import "../styles/spinner.css";
import useAuth from "../hooks/useAuth";

export default function Spinner() {
  const { theme } = useAuth();
  return (
    <div
      className={`${theme} flex flex-col place-items-center justify-center dark:bg-on-surface min-h-lvh`}
    >
      <div className="spinner border-on-surface border-t-blue-300 dark:border-surface dark:border-t-surface"></div>
      <p className="dark:text-surface">Loading...</p>
    </div>
  );
}
