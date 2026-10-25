"use client";

import React, { useState, useMemo } from "react";
import { Passenger } from "../types/titanic";
import FilterPanel from "./FilterPanel";
import MetricCard from "./MetricCard";
import SurvivalChart from "./SurvivalChart";
import styles from "../app/dashboard.module.css";
import { Users, Percent, Flame, BadgeDollarSign, Ship } from "lucide-react";

interface DashboardProps {
  initialPassengers: Passenger[];
}

export default function Dashboard({ initialPassengers }: DashboardProps) {
  // Filter States
  const [selectedSex, setSelectedSex] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 80]);
  const [fareRange, setFareRange] = useState<[number, number]>([0, 513]);

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedSex("all");
    setSelectedClass("all");
    setAgeRange([0, 80]);
    setFareRange([0, 513]);
  };

  // Filter passengers reactively
  const filteredPassengers = useMemo(() => {
    return initialPassengers.filter((p) => {
      // Sex Filter
      if (selectedSex !== "all" && p.sex !== selectedSex) return false;
      // Class Filter
      if (selectedClass !== "all" && p.pclass.toString() !== selectedClass) return false;
      // Age Filter
      const passengerAge = p.age ?? 0; // treat missing age as 0 or exclude? Let's check range
      if (p.age !== null && (p.age < ageRange[0] || p.age > ageRange[1])) return false;
      if (p.age === null && (ageRange[0] > 0)) return false; // exclude if age is missing and min age is set
      // Fare Filter
      if (p.fare < fareRange[0] || p.fare > fareRange[1]) return false;

      return true;
    });
  }, [initialPassengers, selectedSex, selectedClass, ageRange, fareRange]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    const total = filteredPassengers.length;
    if (total === 0) {
      return {
        total: 0,
        survivedCount: 0,
        survivalRate: 0,
        avgAge: 0,
        totalFare: 0,
      };
    }

    const survivedCount = filteredPassengers.filter((p) => p.survived).length;
    const survivalRate = (survivedCount / total) * 100;
    
    // Average Age (ignoring null values)
    const passengersWithAge = filteredPassengers.filter((p) => p.age !== null);
    const avgAge = passengersWithAge.length > 0
      ? passengersWithAge.reduce((sum, p) => sum + (p.age || 0), 0) / passengersWithAge.length
      : 0;

    const totalFare = filteredPassengers.reduce((sum, p) => sum + p.fare, 0);

    return {
      total,
      survivedCount,
      survivalRate,
      avgAge,
      totalFare,
    };
  }, [filteredPassengers]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className="flex items-center gap-3">
          <Ship size={32} className="text-cyan-400" />
          <h1 className={styles.title}>Titanic Survival Intelligence</h1>
        </div>
        <p className={styles.subtitle}>
          Interactive analytical visualizer mapping demographics, ticket tiers, and passenger survival correlations.
        </p>
      </header>

      {/* Grid Layout */}
      <div className={styles.dashboardGrid}>
        {/* Sidebar Controls */}
        <aside>
          <FilterPanel
            selectedSex={selectedSex}
            setSelectedSex={setSelectedSex}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            ageRange={ageRange}
            setAgeRange={setAgeRange}
            fareRange={fareRange}
            setFareRange={setFareRange}
            onReset={handleResetFilters}
            passengers={initialPassengers}
          />
        </aside>

        {/* Content Area */}
        <main className={styles.contentArea}>
          {/* Metrics KPIs Row */}
          <section className={styles.metricsGrid}>
            <MetricCard
              label="Filtered Passengers"
              value={metrics.total.toLocaleString()}
              subtext={`Out of ${initialPassengers.length} total`}
              icon={<Users size={20} className="text-cyan-400" />}
            />
            <MetricCard
              label="Survival Rate"
              value={`${metrics.survivalRate.toFixed(1)}%`}
              subtext={`${metrics.survivedCount} survived / ${metrics.total - metrics.survivedCount} deceased`}
              icon={<Percent size={20} className="text-emerald-400" />}
              valueColor={metrics.survivalRate > 50 ? "text-emerald-400" : "text-rose-400"}
            />
            <MetricCard
              label="Average Age"
              value={metrics.avgAge > 0 ? `${metrics.avgAge.toFixed(1)} yrs` : "N/A"}
              subtext="Excluding unrecorded ages"
              icon={<Flame size={20} className="text-amber-500" />}
            />
            <MetricCard
              label="Total Fares Paid"
              value={`£${metrics.totalFare.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              subtext={`Avg: £${(metrics.totalFare / (metrics.total || 1)).toFixed(2)}`}
              icon={<BadgeDollarSign size={20} className="text-violet-400" />}
            />
          </section>

          {/* Visualizations Grid */}
          <section className={styles.chartsGrid}>
            {/* Chart 1: Gender Bias */}
            <SurvivalChart
              type="gender"
              data={filteredPassengers}
              title="Survival Rate by Gender"
            />
            {/* Chart 2: Passenger Class Disparities */}
            <SurvivalChart
              type="class"
              data={filteredPassengers}
              title="Survival Rate by Ticket Class"
            />
            {/* Chart 3: Age Distribution */}
            <SurvivalChart
              type="age"
              data={filteredPassengers}
              title="Age Distribution & Survival Probability"
            />
            {/* Chart 4: Family size correlations */}
            <SurvivalChart
              type="family"
              data={filteredPassengers}
              title="Survival Likelihood by Family Size"
            />
          </section>
        </main>
      </div>
    </div>
  );
}
