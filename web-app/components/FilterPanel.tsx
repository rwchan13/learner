"use client";

import React from "react";
import { Passenger } from "../types/titanic";
import styles from "../app/dashboard.module.css";
import { RotateCcw, SlidersHorizontal } from "lucide-react";

interface FilterPanelProps {
  selectedSex: string;
  setSelectedSex: (sex: string) => void;
  selectedClass: string;
  setSelectedClass: (pclass: string) => void;
  ageRange: [number, number];
  setAgeRange: (range: [number, number]) => void;
  fareRange: [number, number];
  setFareRange: (range: [number, number]) => void;
  onReset: () => void;
  passengers: Passenger[];
}

export default function FilterPanel({
  selectedSex,
  setSelectedSex,
  selectedClass,
  setSelectedClass,
  ageRange,
  setAgeRange,
  fareRange,
  setFareRange,
  onReset,
}: FilterPanelProps) {
  return (
    <div className={`${styles.filterPanel} glass-panel`}>
      <div className={styles.filterHeader}>
        <span className={styles.chartTitle}>
          <SlidersHorizontal size={18} className="text-cyan-400" />
          Filter Engine
        </span>
        <button onClick={onReset} className={styles.resetButton} title="Reset filters">
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* Sex Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Gender</label>
        <select
          value={selectedSex}
          onChange={(e) => setSelectedSex(e.target.value)}
          className="custom-select"
        >
          <option value="all">All Genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>

      {/* Class Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Ticket Class</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="custom-select"
        >
          <option value="all">All Classes</option>
          <option value="1">1st Class (Upper)</option>
          <option value="2">2nd Class (Middle)</option>
          <option value="3">3rd Class (Lower)</option>
        </select>
      </div>

      {/* Age Filter */}
      <div className={styles.filterGroup}>
        <div className="flex justify-between items-center mb-1">
          <label className={styles.filterLabel}>Age Span</label>
          <span className={styles.sliderVal}>
            {ageRange[0]} - {ageRange[1]} yrs
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 w-8">Min:</span>
            <input
              type="range"
              min="0"
              max="80"
              value={ageRange[0]}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setAgeRange([Math.min(val, ageRange[1]), ageRange[1]]);
              }}
              className="flex-1 accent-cyan-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 w-8">Max:</span>
            <input
              type="range"
              min="0"
              max="80"
              value={ageRange[1]}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setAgeRange([ageRange[0], Math.max(val, ageRange[0])]);
              }}
              className="flex-1 accent-cyan-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Fare Filter */}
      <div className={styles.filterGroup}>
        <div className="flex justify-between items-center mb-1">
          <label className={styles.filterLabel}>Ticket Fare</label>
          <span className={styles.sliderVal}>
            £{fareRange[0]} - £{fareRange[1]}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 w-8">Min:</span>
            <input
              type="range"
              min="0"
              max="513"
              value={fareRange[0]}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setFareRange([Math.min(val, fareRange[1]), fareRange[1]]);
              }}
              className="flex-1 accent-cyan-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 w-8">Max:</span>
            <input
              type="range"
              min="0"
              max="513"
              value={fareRange[1]}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setFareRange([fareRange[0], Math.max(val, fareRange[0])]);
              }}
              className="flex-1 accent-cyan-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
