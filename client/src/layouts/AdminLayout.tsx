import Header from "../components/Header";
import Footer from "../components/Footer";
import type { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
  theme: string;
};

export default function AdminLayout({ children, theme }: AdminLayoutProps) {
  return (
    <div className={theme}>
      <Header />
      <main className="min-h-158">{children}</main>
      <Footer />
    </div>
  );
}
