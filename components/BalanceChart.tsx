
"use client";
import { useState } from "react";

const months = ["1 Jul","3 Jul","5 Jul","8 Jul","10 Jul","13 Jul","15 Jul","17 Jul","19 Jul"];
const thisMonth = [8000, 14000, 11000, 15000, 12000, 13500, 11500, 14000, 15700];
const lastMonth = [7000, 10000, 9500, 12000, 10000, 11000, 9000, 12000, 13000];

const viewW = 500;
const viewH = 180;
const padL = 44;
const padR = 14;
const padT = 14;
const padB = 30;

function toPath(data: number[]) {
  const minV = 5000;
  const maxV = 20000;
  const xs = data.map((_, i) => padL + (i / (data.length - 1)) * (viewW - padL - padR));
  const ys = data.map(v => padT + (1 - (v - minV) / (maxV - minV)) * (viewH - padT - padB));
  let d = `M ${xs[0]} ${ys[0]}`;
  for (let i = 1; i < xs.length; i++) {
    const mx = (xs[i - 1] + xs[i]) / 2;
    d += ` C ${mx} ${ys[i - 1]}, ${mx} ${ys[i]}, ${xs[i]} ${ys[i]}`;
  }
  return { d, xs, ys };
}

const yLabels = [20000, 15000, 10000, 5000];
const minV = 5000, maxV = 20000;

export default function BalanceChart() {
  const [chartType, setChartType] = useState("Total balance");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const { d: d1, xs, ys } = toPath(thisMonth);
  const { d: d2, ys: ys2 } = toPath(lastMonth);

  const areaClose = ` L ${xs[xs.length-1]} ${viewH - padB} L ${padL} ${viewH - padB} Z`;

  const types = ["Total balance", "Income", "Expense"];

  return (
    <div>
      <div className="chart-header">
        <span className="chart-title">Total balance overview</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="chart-legend">
            <div className="legend-item"><span className="legend-dot solid" /> This month</div>
            <div className="legend-item"><span className="legend-dot dashed" /> Same period last month</div>
          </div>
          <div style={{ position: "relative" }}>
            <select
              className="chart-type-selector"
              value={chartType}
              onChange={e => setChartType(e.target.value)}
              style={{ border: "1.5px solid var(--border)", borderRadius: 8, background: "var(--bg)", fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "0.78rem", padding: "5px 10px", cursor: "pointer" }}
            >
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${viewW} ${viewH}`} width="100%" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7c5cfc" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="balGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b39dfc" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#b39dfc" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Y axis labels */}
        {yLabels.map(v => {
          const y = padT + (1 - (v - minV) / (maxV - minV)) * (viewH - padT - padB);
          return (
            <g key={v}>
              <text x={padL - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#b0b0c3" fontFamily="DM Sans">
                ${(v/1000).toFixed(0)}k
              </text>
              <line x1={padL} y1={y} x2={viewW - padR} y2={y} stroke="#ebebf5" strokeWidth="1" />
            </g>
          );
        })}

        {/* Area fills */}
        <path d={d2 + areaClose} fill="url(#balGrad2)" />
        <path d={d1 + areaClose} fill="url(#balGrad)" />

        {/* Lines */}
        <path d={d2} fill="none" stroke="#b39dfc" strokeWidth="2" strokeDasharray="5 4" />
        <path d={d1} fill="none" stroke="#7c5cfc" strokeWidth="2.5" />

        {/* Hover interaction zones */}
        {xs.map((x, i) => (
          <g key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
            <rect
              x={x - 18}
              y={padT}
              width={36}
              height={viewH - padT - padB}
              fill="transparent"
              style={{ cursor: "crosshair" }}
            />
            {hoveredIdx === i && (
              <>
                <line x1={x} y1={padT} x2={x} y2={viewH - padB} stroke="#7c5cfc" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx={x} cy={ys[i]} r={5} fill="#7c5cfc" stroke="white" strokeWidth="2" />
                <circle cx={x} cy={ys2[i]} r={4} fill="#b39dfc" stroke="white" strokeWidth="2" />
                <rect x={x - 36} y={ys[i] - 24} width={72} height={20} rx={5} fill="#1a1a2e" />
                <text x={x} y={ys[i] - 10} textAnchor="middle" fontSize="9" fill="white" fontFamily="DM Sans" fontWeight="700">
                  ${thisMonth[i].toLocaleString()}
                </text>
              </>
            )}
          </g>
        ))}

        {/* Highlight point */}
        <circle cx={xs[3]} cy={ys[3]} r={6} fill="white" stroke="#7c5cfc" strokeWidth="2.5" />
        <rect x={xs[3] - 26} y={ys[3] - 26} width={52} height={20} rx={5} fill="#1a1a2e" />
        <text x={xs[3]} y={ys[3] - 12} textAnchor="middle" fontSize="9" fill="white" fontFamily="DM Sans" fontWeight="700">
          $15,000
        </text>

        {/* X axis labels */}
        {xs.map((x, i) => (
          <text key={i} x={x} y={viewH - 4} textAnchor="middle" fontSize="8.5" fill="#b0b0c3" fontFamily="DM Sans">
            {months[i]}
          </text>
        ))}
      </svg>
    </div>
  );
}
