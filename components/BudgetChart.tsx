
"use client";
import { useState } from "react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const data = [
  { expense: 2200, budget: 2500 },
  { expense: 3200, budget: 2500, exceeded: true },
  { expense: 1800, budget: 2500 },
  { expense: 2800, budget: 2500 },
  { expense: 2100, budget: 2500 },
  { expense: 2600, budget: 2500 },
  { expense: 1900, budget: 2500 },
];

const maxVal = 3500;

export default function BudgetChart() {
  const [year, setYear] = useState("This year");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const years = ["This year", "Last year", "2023"];

  return (
    <div>
      <div className="chart-header">
        <span className="chart-title">Comparing of budget and expense</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-dot solid" /> Expense
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: "var(--purple-light)", border: "1.5px solid var(--purple-mid)", borderRadius: "50%", display: "inline-block", width: 8, height: 8 }} />
              Budget
            </div>
          </div>
          <select
            value={year}
            onChange={e => setYear(e.target.value)}
            style={{ border: "1.5px solid var(--border)", borderRadius: 8, background: "var(--bg)", fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "0.78rem", padding: "5px 10px", cursor: "pointer" }}
          >
            {years.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Y labels */}
      <div style={{ display: "flex", gap: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: 140, marginRight: 8, paddingBottom: 20 }}>
          {[3500, 2500, 1500, 500].map(v => (
            <span key={v} style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1 }}>
              ${(v / 1000).toFixed(1)}k
            </span>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            height: 120,
            gap: 8,
            borderBottom: "1.5px solid var(--border)",
            paddingBottom: 0,
          }}>
            {data.map((d, i) => {
              const expH = (d.expense / maxVal) * 110;
              const budH = (d.budget / maxVal) * 110;
              const isHovered = hoveredBar === i;

              return (
                <div
                  key={i}
                  style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", position: "relative" }}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {d.exceeded && (
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#1a1a2e",
                      color: "white",
                      padding: "3px 7px",
                      borderRadius: 6,
                      fontSize: "0.6rem",
                      whiteSpace: "nowrap",
                      zIndex: 10,
                      lineHeight: 1.3,
                    }}>
                      Exceeded<br />by {(d.expense - d.budget).toLocaleString()} ${((d.expense - d.budget) / d.budget * 100).toFixed(0)}%
                    </div>
                  )}

                  {isHovered && !d.exceeded && (
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#1a1a2e",
                      color: "white",
                      padding: "3px 7px",
                      borderRadius: 6,
                      fontSize: "0.62rem",
                      whiteSpace: "nowrap",
                      zIndex: 10,
                    }}>
                      ${d.expense.toLocaleString()}
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
                    <div style={{
                      width: 14,
                      height: expH,
                      borderRadius: "5px 5px 0 0",
                      background: d.exceeded ? "var(--purple)" : isHovered ? "var(--purple)" : "var(--purple)",
                      opacity: isHovered ? 1 : d.exceeded ? 1 : 0.82,
                      transition: "opacity 0.2s, height 0.3s",
                    }} />
                    <div style={{
                      width: 14,
                      height: budH,
                      borderRadius: "5px 5px 0 0",
                      background: "var(--purple-light)",
                      backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(124,92,252,0.15) 3px, rgba(124,92,252,0.15) 5px)",
                      border: "1.5px solid var(--purple-mid)",
                      borderBottom: "none",
                      opacity: isHovered ? 1 : 0.7,
                      transition: "opacity 0.2s",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            {months.map(m => (
              <div key={m} style={{ flex: 1, textAlign: "center", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
