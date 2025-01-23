"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function NavBar() {
  const { data } = useSession();

  const navStyle = {
    padding: "1rem",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const linkStyle = {
    marginLeft: "1rem",
    color: "#1f2937",
    textDecoration: "none",
  };

  const buttonStyle = {
    marginLeft: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "0.25rem",
    cursor: "pointer",
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link href="/" style={linkStyle}>
          Home
        </Link>
        <Link href="/sheds" style={linkStyle}>
          Shed Inventory
        </Link>
        <Link
          href="/trailers"
          style={{
            padding: "8px 16px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Trailer Inventory
        </Link>
      </div>
      <div>
        {data ? (
          <button onClick={() => signOut()} style={buttonStyle}>
            Logout
          </button>
        ) : (
          <Link href="/login" style={linkStyle}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
