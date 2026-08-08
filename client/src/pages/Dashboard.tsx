import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { auth } = useAuth();

  return (
    <>
      <div>Dashboard</div>

      <div>Welcome {auth.firstName.toUpperCase()}</div>
    </>
  );
}
