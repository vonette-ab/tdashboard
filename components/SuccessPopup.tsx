"use client";

import Link from "next/link";

export default function SuccessPopup({
  message,
  subtext,
}: {
  message: string;
  subtext: string;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "40px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          maxWidth: 360,
        }}
      >
        <div style={{ fontSize: "48px" }}>✅</div>
        <h2 style={{ margin: "16px 0 8px" }}>{message}</h2>
        <p style={{ color: "#666", marginBottom: "16px" }}>{subtext}</p>
        <Link
          href="/dashboard"
          style={{
            display: "inline-block",
            padding: "10px 16px",
            background: "#7c5cfc",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}