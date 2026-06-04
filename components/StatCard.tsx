"use client";
import { useState } from "react";

interface StatCardProps {
  label: string;
  amount: string;
  cents: string;
  change: number;
  transactions: number;
  categories: number;
  note: string;
}

const currencies = ["USD", "EUR", "GBP", "GHS"];

export default function StatCard({
  label, amount, cents, change,  transactions, categories, note,
}: StatCardProps) {
  const [currency, setCurrency] = useState("USD");
  const [currIdx, setCurrIdx] = useState(0);

  const cycleCurrency = () => {
    const next = (currIdx + 1) % currencies.length;
    setCurrIdx(next);
    setCurrency(currencies[next]);
  };

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>
        <button className="currency-selector" onClick={cycleCurrency}>
          {currency}
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="stat-amount">
        {amount}<span className="stat-cents">{cents}</span>
      </div>

      

      <div className="stat-meta">
        <div className="meta-item">
          <span className="meta-dot" />
          {transactions} transactions
        </div>
        <div className="meta-item">
          <span className="meta-dot" style={{ background: "var(--purple-light)", border: "1.5px solid var(--purple-mid)" }} />
          {categories} categories
        </div>
      </div>

      <div className="stat-note">{note}</div>
    </div>
  );
}
