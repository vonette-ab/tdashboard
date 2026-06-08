
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveToken } from "@/lib/auth";
import SuccessPopup from "@/components/SuccessPopup";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

   const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ MOCK — no API needed, remove this when your API is ready
  saveToken("mock-token-123");
  setShowPopup(true);
  setTimeout(() => {
    router.push("/dashboard");
  }, 2000);
};

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>No account? <Link href="/register">Register here</Link></p>
    </div>
  );
}

{showPopup && (
  <SuccessPopup
    message="Login Successful!"
    subtext="Redirecting you to the dashboard..."
  />
)}




