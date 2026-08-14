import Header from "../components/Header";
import Footer from "../components/Footer";
import type { ReactNode } from "react";

type ManagerLayoutProps = {
  children: ReactNode;
  theme: string;
};

export default function ManagerLayout({ children, theme }: ManagerLayoutProps) {
  return (
    <div className={theme}>
      <Header />
      <main className="min-h-158 dark:bg-on-surface">{children}</main>
      <Footer />
    </div>
  );
}
