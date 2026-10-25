"use client";

import React, { ReactNode } from "react";
import styles from "../app/dashboard.module.css";

interface MetricCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon?: ReactNode;
  valueColor?: string;
}

export default function MetricCard({
  label,
  value,
  subtext,
  icon,
  valueColor = "text-white",
}: MetricCardProps) {
  return (
    <div className={`${styles.metricCard} glass-panel`}>
      <div className="flex justify-between items-start w-full">
        <span className={styles.metricLabel}>{label}</span>
        {icon && <div className="p-1.5 rounded-lg bg-slate-800/60 border border-slate-700/30">{icon}</div>}
      </div>
      <div className={`${styles.metricValue} ${valueColor}`}>{value}</div>
      {subtext && <span className={styles.metricSubtext}>{subtext}</span>}
    </div>
  );
}
