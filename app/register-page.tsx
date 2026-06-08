
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveToken } from "@/lib/auth";
import SuccessPopup from "@/components/SuccessPopup";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#22c55e", "#7c5cfc"][strength];

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ MOCK — no API needed, remove this when your API is ready
  saveToken("mock-token-123");
  setShowPopup(true);
  setTimeout(() => {
    router.push("/dashboard");
  }, 2000);
};
  return (
    <div className="auth-root">
      {/* Left  */}
      <div className="auth-left">
        <div className="auth-left-inner">
          <div className="auth-brand">
            <div className="auth-logo-icon">F</div>
            <span className="auth-brand-name">FinSet</span>
          </div>
          <div className="auth-hero">
            <div className="hero-graphic">
              <div className="hero-card hero-card-1">
                <div className="hero-card-label">Total Balance</div>
                <div className="hero-card-amount">$15,700<span>.00</span></div>
                <div className="hero-card-badge positive">↑ 12.1%</div>
              </div>
              <div className="hero-card hero-card-2">
                <div className="hero-card-label">This Month Income</div>
                <div className="hero-card-amount">$8,500<span>.00</span></div>
                <div className="hero-card-badge positive">↑ 6.3%</div>
              </div>
              <div className="hero-card hero-card-3">
                <div className="hero-card-label">Expenses</div>
                <div className="hero-card-amount">$6,222<span>.00</span></div>
                <div className="hero-card-badge negative">↑ 2.4%</div>
              </div>
              <div className="hero-orb hero-orb-1" />
              <div className="hero-orb hero-orb-2" />
            </div>
            <h2 className="hero-heading">Start tracking<br />what matters.</h2>
            <p className="hero-sub">Join thousands who use FinSet to take control of their financial life.</p>
          </div>
          <div className="auth-left-dots">
            {[...Array(12)].map((_, i) => <span key={i} className="dot" />)}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <h1 className="auth-title">Create account</h1>
            <p className="auth-subtitle">Get started with FinSet for free</p>
          </div>

          <form className="auth-form" onSubmit={handleRegister} noValidate>
            <div className={`auth-field${focusedField === "name" ? " focused" : ""}`}>
              <label className="auth-label">Full name</label>
              <div className="auth-input-wrap">
                <svg className="field-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="10" cy="7" r="3.5" />
                  <path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="Adaline Lively"
                  value={form.name}
                  onChange={e => update("name", e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className={`auth-field${focusedField === "email" ? " focused" : ""}`}>
              <label className="auth-label">Email address</label>
              <div className="auth-input-wrap">
                <svg className="field-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="2" y="5" width="16" height="12" rx="2" />
                  <path d="M2 8l8 5 8-5" strokeLinecap="round" />
                </svg>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => update("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={`auth-field${focusedField === "password" ? " focused" : ""}`}>
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <svg className="field-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="4" y="9" width="12" height="9" rx="2" />
                  <path d="M7 9V6a3 3 0 0 1 6 0v3" strokeLinecap="round" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={e => update("password", e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="new-password"
                />
                <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="16" height="16">
                      <path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" /><circle cx="10" cy="10" r="2.5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="16" height="16">
                      <path d="M3 3l14 14M8.5 8.6A2.5 2.5 0 0 0 11.4 11.5M6.2 6.3C4.5 7.3 3 9 3 9s3 5 7 5c1.4 0 2.7-.5 3.8-1.2M10 5c4 0 7 4 7 4s-.8 1.3-2.2 2.5" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              </div>
              {form.password && (
                <div className="strength-bar-wrap">
                  <div className="strength-bars">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="strength-bar" style={{ background: i <= strength ? strengthColor : "var(--border)" }} />
                    ))}
                  </div>
                  <span className="strength-label" style={{ color: strengthColor }}>{strengthLabel}</span>
                </div>
              )}
            </div>

            <div className={`auth-field${focusedField === "confirm" ? " focused" : ""}${form.confirm && form.confirm !== form.password ? " errored" : ""}`}>
              <label className="auth-label">Confirm password</label>
              <div className="auth-input-wrap">
                <svg className="field-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={e => update("confirm", e.target.value)}
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <label className="auth-remember" style={{ alignItems: "flex-start", gap: 10 }}>
              <input type="checkbox" className="auth-checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                I agree to the <a href="#" className="auth-link">Terms of Service</a> and <a href="#" className="auth-link">Privacy Policy</a>
              </span>
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className={`auth-submit-btn${loading ? " loading" : ""}`} disabled={loading}>
              {loading ? <span className="auth-spinner" /> : <>Create account <span className="btn-arrow">→</span></>}
            </button>

            <div className="auth-divider"><span>or sign up with</span></div>

            <div className="auth-socials">
              <button type="button" className="social-btn">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button type="button" className="social-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link href="/login" className="auth-link font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );


}

{showPopup && (
  <SuccessPopup
    message="Login Successful!"
    subtext="Redirecting you to the dashboard..."
  />
)}
