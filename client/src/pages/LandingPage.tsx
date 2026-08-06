import { useState, useEffect } from "react";
import Header from "../components/Header";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="p-2 text-center bg-slate-400 min-h-screen">
        <h1 className="text-2xl">Welcome to Retail Pro</h1>
        <p>Store sales and inventory management system</p>
      </main>
    </>
  );
}
