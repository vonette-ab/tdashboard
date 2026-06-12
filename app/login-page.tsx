
"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveToken } from "@/lib/auth";
import SuccessPopup from "@/components/SuccessPopup";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({ message: "Login failed" }));

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      saveToken(data.token);
      setShowPopup(true);

      window.setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 200, margin: "3rem auto", fontFamily: "sans-serif", backgroundColor: "##b39dfc" }}>
      <h3>Login</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "8px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "8px" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "0.75rem", cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <p style={{ marginTop: "1rem" }}>
        No account? <Link href="/register">Register here</Link>
      </p>

      {showPopup && (
        <SuccessPopup message="Login Successful!" subtext="Redirecting you to the dashboard..." />
      )}
    </div>
  );
}

