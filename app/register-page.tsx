
"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveToken } from "@/lib/auth";
import SuccessPopup from "@/components/SuccessPopup";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json().catch(() => ({ message: "Registration failed" }));

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      saveToken(data.token);
      setShowPopup(true);

      window.setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "3rem auto", fontFamily: "sans-serif", backgroundColor: "##b39dfc" }}>
      <h1>Create account</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleRegister}>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "8px" }}
          />
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
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "8px" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "0.75rem", cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </div>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link href="/login">Login here</Link>
      </p>

      {showPopup && (
        <SuccessPopup message="Account Created!" subtext="Redirecting you to the dashboard..." />
      )}
    </div>
  );
}

