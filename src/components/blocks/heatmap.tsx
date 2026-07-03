"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

export type HeatmapData = Array<{ date: string; value: number }>;

export interface HeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  data: HeatmapData;
  startDate: Date;
  endDate: Date;
  colorMode?: "interpolate" | "steps";
  className?: string;
}

export default function Heatmap({
  data,
  startDate,
  endDate,
  colorMode = "steps",
  className,
  ...props
}: HeatmapProps) {
  // Map date strings to values for fast O(1) lookup
  const dateMap = useMemo(() => {
    return new Map(data.map((d) => [d.date, d.value]));
  }, [data]);

  // Generate all grid cells including initial day padding
  const { columns, monthLabels } = useMemo(() => {
    const cells = [];
    const current = new Date(startDate);
    const end = new Date(endDate);

    // Day of week padding for the first week (0 is Sunday, 1 is Monday, etc.)
    const startDay = current.getDay();
    for (let i = 0; i < startDay; i++) {
      cells.push({ pad: true, date: "", value: 0, day: i, month: -1, year: -1 });
    }

    // Fill dates
    while (current <= end) {
      const dateStr = current.toISOString().split("T")[0];
      const val = dateMap.get(dateStr) || 0;
      cells.push({
        pad: false,
        date: dateStr,
        value: val,
        day: current.getDay(),
        month: current.getMonth(),
        year: current.getFullYear(),
      });
      current.setDate(current.getDate() + 1);
    }

    // Group cells into columns of 7 days (weeks)
    const cols = [];
    for (let i = 0; i < cells.length; i += 7) {
      cols.push(cells.slice(i, i + 7));
    }

    // Calculate month labels positions
    let lastMonth = -1;
    const labels: Array<{ label: string; colIdx: number }> = [];
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    cols.forEach((col, idx) => {
      const firstRealDay = col.find((d) => !d.pad);
      if (firstRealDay && firstRealDay.month !== lastMonth) {
        lastMonth = firstRealDay.month;
        labels.push({ label: monthNames[lastMonth], colIdx: idx });
      }
    });

    return { columns: cols, monthLabels: labels };
  }, [startDate, endDate, dateMap]);

  // Premium HSL green/emerald color steps matching dark aesthetic
  const getCellColor = (val: number) => {
    if (val === 0) return "rgba(63, 63, 70, 0.15)"; // zinc-700 at 0.15 opacity
    if (colorMode === "interpolate") {
      // Linear HSL mapping
      const lightness = Math.max(30, 80 - Math.min(val * 1.8, 50));
      return `hsla(142, 70%, ${lightness}%, ${Math.min(0.2 + val * 0.05, 1.0)})`;
    } else {
      // Discretized color step levels
      if (val < 5) return "rgba(16, 185, 129, 0.25)";   // Level 1
      if (val < 15) return "rgba(16, 185, 129, 0.50)";  // Level 2
      if (val < 25) return "rgba(16, 185, 129, 0.75)";  // Level 3
      return "rgba(16, 185, 129, 1.0)";                 // Level 4
    }
  };

  const dayOfWeekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      className={cn(
        "flex flex-col bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl w-full max-w-4xl font-mono text-[11px] text-zinc-400 select-none",
        className
      )}
      {...props}
    >
      {/* Months Header Row */}
      <div className="relative h-5 mb-2 ml-9">
        {monthLabels.map((lbl, i) => (
          <span
            key={i}
            className="absolute text-[10px] text-zinc-500 font-medium tracking-tight"
            style={{ left: `${lbl.colIdx * 14}px` }}
          >
            {lbl.label}
          </span>
        ))}
      </div>

      <div className="flex gap-2.5">
        {/* Left Day Labels Column */}
        <div className="flex flex-col justify-between h-[98px] pr-1.5 text-[9px] text-zinc-500 font-medium">
          {dayOfWeekLabels.map((label, idx) => (
            <span key={idx} className={idx % 2 === 0 ? "invisible" : ""}>
              {label}
            </span>
          ))}
        </div>

        {/* Grid Cells Columns Wrapper */}
        <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-[3px]">
              {col.map((cell, cellIdx) => {
                if (cell.pad) {
                  return (
                    <div
                      key={cellIdx}
                      className="w-[11px] h-[11px] bg-transparent"
                    />
                  );
                }

                return (
                  <div
                    key={cellIdx}
                    className="w-[11px] h-[11px] rounded-[2.5px] transition-all duration-200 cursor-pointer relative group"
                    style={{ backgroundColor: getCellColor(cell.value) }}
                  >
                    {/* Tooltip Hover Overlay */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
                      <div className="bg-zinc-950 border border-zinc-800 text-white text-[9px] font-sans font-medium px-2.5 py-1 rounded-md shadow-2xl whitespace-nowrap flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        <span>{cell.value} commits</span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-zinc-400">{cell.date}</span>
                      </div>
                      <div className="w-1.5 h-1.5 bg-zinc-950 border-r border-b border-zinc-800 absolute top-full left-1/2 -translate-x-1/2 -translate-y-[4px] rotate-45" />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info / Legend */}
      <div className="flex justify-between items-center mt-5 pt-3 border-t border-white/5 text-[9px] text-zinc-500">
        <span>Showing contribution activity</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="w-[11px] h-[11px] rounded-[2.5px]" style={{ backgroundColor: "rgba(63, 63, 70, 0.15)" }} />
          <div className="w-[11px] h-[11px] rounded-[2.5px]" style={{ backgroundColor: "rgba(16, 185, 129, 0.25)" }} />
          <div className="w-[11px] h-[11px] rounded-[2.5px]" style={{ backgroundColor: "rgba(16, 185, 129, 0.50)" }} />
          <div className="w-[11px] h-[11px] rounded-[2.5px]" style={{ backgroundColor: "rgba(16, 185, 129, 0.75)" }} />
          <div className="w-[11px] h-[11px] rounded-[2.5px]" style={{ backgroundColor: "rgba(16, 185, 129, 1.0)" }} />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
