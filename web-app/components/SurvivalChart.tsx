"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Passenger } from "../types/titanic";
import styles from "../app/dashboard.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { User2, Trophy, Clock, Heart } from "lucide-react";

interface SurvivalChartProps {
  type: "gender" | "class" | "age" | "family";
  data: Passenger[];
  title: string;
}

export default function SurvivalChart({ type, data, title }: SurvivalChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Gender Data aggregation
  const genderData = useMemo(() => {
    if (type !== "gender") return [];
    
    const genders = ["female", "male"];
    return genders.map((g) => {
      const group = data.filter((p) => p.sex === g);
      const survived = group.filter((p) => p.survived).length;
      const deceased = group.length - survived;
      return {
        name: g === "female" ? "Female" : "Male",
        Survived: survived,
        Deceased: deceased,
      };
    });
  }, [type, data]);

  // 2. Class Data aggregation
  const classData = useMemo(() => {
    if (type !== "class") return [];
    
    const classes = [1, 2, 3];
    return classes.map((c) => {
      const group = data.filter((p) => p.pclass === c);
      const survived = group.filter((p) => p.survived).length;
      const deceased = group.length - survived;
      return {
        name: c === 1 ? "1st Class" : c === 2 ? "2nd Class" : "3rd Class",
        Survived: survived,
        Deceased: deceased,
      };
    });
  }, [type, data]);

  // 3. Age Data aggregation
  const ageData = useMemo(() => {
    if (type !== "age") return [];
    
    // Bins definition
    const bins = [
      { name: "0-9", min: 0, max: 9 },
      { name: "10-19", min: 10, max: 19 },
      { name: "20-29", min: 20, max: 29 },
      { name: "30-39", min: 30, max: 39 },
      { name: "40-49", min: 40, max: 49 },
      { name: "50-59", min: 50, max: 59 },
      { name: "60+", min: 60, max: 120 },
    ];

    // Filter passengers who actually have age recorded
    const passengersWithAge = data.filter((p) => p.age !== null);

    return bins.map((bin) => {
      const group = passengersWithAge.filter(
        (p) => (p.age || 0) >= bin.min && (p.age || 0) <= bin.max
      );
      const survived = group.filter((p) => p.survived).length;
      const deceased = group.length - survived;
      return {
        name: bin.name,
        Survived: survived,
        Deceased: deceased,
      };
    });
  }, [type, data]);

  // 4. Family Data aggregation (Line Chart: Survival Rate by Family Size)
  const familyData = useMemo(() => {
    if (type !== "family") return [];

    // Max family size is typically around 11
    const sizes = Array.from({ length: 11 }, (_, i) => i + 1);
    
    return sizes
      .map((size) => {
        const group = data.filter((p) => p.familySize === size);
        if (group.length === 0) return null;
        const survived = group.filter((p) => p.survived).length;
        const survivalRate = Math.round((survived / group.length) * 100);
        return {
          name: size === 1 ? "Alone" : `${size} members`,
          "Survival Rate (%)": survivalRate,
          Count: group.length,
        };
      })
      .filter((item) => item !== null) as { name: string; "Survival Rate (%)": number; Count: number }[];
  }, [type, data]);

  // Dynamic Chart Header Icons
  const headerIcon = useMemo(() => {
    switch (type) {
      case "gender":
        return <User2 size={18} className="text-cyan-400" />;
      case "class":
        return <Trophy size={18} className="text-cyan-400" />;
      case "age":
        return <Clock size={18} className="text-cyan-400" />;
      case "family":
        return <Heart size={18} className="text-cyan-400" />;
    }
  }, [type]);

  // Hydration protection
  if (!isMounted) {
    return (
      <div className={`${styles.chartCard} glass-panel justify-center items-center`}>
        <span className="text-sm text-slate-500 animate-pulse">Initializing visualization...</span>
      </div>
    );
  }

  // Check if data is empty to prevent blank charts
  if (data.length === 0) {
    return (
      <div className={`${styles.chartCard} glass-panel justify-center items-center`}>
        <div className={styles.chartTitle}>
          {headerIcon}
          {title}
        </div>
        <span className="text-sm text-slate-500 mt-20">No matching passenger data for these filters.</span>
      </div>
    );
  }

  return (
    <div className={`${styles.chartCard} glass-panel`}>
      <div className={styles.chartTitle}>
        {headerIcon}
        {title}
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          {/* GENDER & CLASS: Stacked Bar Chart */}
          {type === "gender" || type === "class" ? (
            <BarChart
              data={type === "gender" ? genderData : classData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Survived" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Deceased" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : type === "age" ? (
            /* AGE BINS: Stacked Area Chart */
            <AreaChart
              data={ageData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="Survived" stackId="1" stroke="#10b981" fill="rgba(16, 185, 129, 0.2)" />
              <Area type="monotone" dataKey="Deceased" stackId="1" stroke="#f43f5e" fill="rgba(244, 63, 94, 0.2)" />
            </AreaChart>
          ) : (
            /* FAMILY SIZE: Line Chart */
            <LineChart
              data={familyData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} unit="%" />
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              <Line
                type="monotone"
                dataKey="Survival Rate (%)"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: '#06b6d4', r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
