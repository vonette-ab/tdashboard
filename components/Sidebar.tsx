
"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

type NavItem = {
  label: string;
  href?: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: (
      <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="2" y="2" width="7" height="7" rx="2" />
        <rect x="11" y="2" width="7" height="7" rx="2" />
        <rect x="2" y="11" width="7" height="7" rx="2" />
        <rect x="11" y="11" width="7" height="7" rx="2" />
      </svg>
    ),
  },
  {
    label: "Transactions",
    icon: (
      <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 6h12M4 10h8M4 14h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Wallet",
    href: "/data-table",
    icon : (
      <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="2" y="3" width="16" height="14" rx="2" />
        <path d="M2 7h16M2 11h16M2 15h16" strokeLinecap="round" />
        <path d="M7 7v10" strokeLinecap="round" />
      </svg>
    ),
  },
   
  {
    label: "Goals",
    icon: (
      <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="10" cy="10" r="7" />
        <circle cx="10" cy="10" r="3" />
        <path d="M10 3v2M10 15v2M3 10h2M15 10h2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Budget",
    icon: (
      <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M10 2v16M6 6h8M5 10h10M7 14h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    icon: (
      <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 15l4-5 4 3 4-7 2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (
      <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="10" cy="10" r="3" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const bottomItems: NavItem[] = [
  {
    label: "Help",
    icon: (
      <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="10" cy="10" r="8" />
        <path d="M7.5 7.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 1.5-2.5 2-2.5 3" strokeLinecap="round" />
        <circle cx="10" cy="14.5" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Log out",
    icon: (
      <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" strokeLinecap="round" />
        <path d="M15 7l3 3-3 3M8 10h10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <aside className="sidebar">
      <button className="sidebar-collapse-btn" title="Collapse sidebar">
        ‹
      </button>

      <div className="sidebar-logo">
        <div className="logo-icon">F</div>
        FinSet
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = activeNav === item.label;
          const content = (
            <>
              {item.icon}
              <span>{item.label}</span>
            </>
          );

          if (item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`nav-item${isActive ? " active" : ""}`}
                onClick={() => setActiveNav(item.label)}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.label}
              className={`nav-item${isActive ? " active" : ""}`}
              onClick={() => setActiveNav(item.label)}
            >
              {content}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className="nav-item"
            onClick={() => item.label === "Log out" && alert("Logged out")}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
        <div className="theme-row">
          <button
            className={`theme-btn${!darkMode ? " active" : ""}`}
            onClick={() => setDarkMode(false)}
            title="Light mode"
          >
            ☀️
          </button>
          <button
            className={`theme-btn${darkMode ? " active" : ""}`}
            onClick={() => setDarkMode(true)}
            title="Dark mode"
          >
            🌙
          </button>
        </div>
      </div>
    </aside>
  );
}
