# Project Roadmap

This document outlines the visual analysis web application development milestones structured into Now, Next, and Later phases.

---

## 1. Now (Current Phase)

This phase covers the primary implementation of the interactive Titanic Survival Data Visualization Dashboard.

### A. Initialization & Setup
* [ ] **Run Boilerplate Creation**: Run the following non-interactive command at the repository root to create `web-app/`:
  ```bash
  npx -y create-next-app@latest web-app --ts --src --app --import-alias "@/*" --use-npm
  ```
* [ ] **Install Packages**: Install frontend visualizer dependencies and types:
  ```bash
  cd web-app && npm install recharts papaparse lucide-react && npm install -D @types/papaparse
  ```
* [ ] **Verify Development Startup**: Spin up the local development server:
  ```bash
  cd web-app && npm run dev
  ```
  Check that the boilerplate runs correctly at `http://localhost:3000`.

### B. Core Implementation
* [ ] **Data Pipeline (Server Component)**: Read and parse the local CSV `/data/Titanic-Dataset.csv` using Node `fs/promises` and `PapaParse`.
* [ ] **Layout & Themes**: Incorporate dark-mode styling and glassmorphism cards in global stylesheets.
* [ ] **Filter Components**: Create the client-side state hooks for interactive demographic filter parameters (Sex, Class, Age, Fare).
* [ ] **Metric Cards**: Display KPI calculations (e.g. Total Passengers, Survival Rate, Average Age, Total Fare).
* [ ] **Recharts Visualizations**:
  * [ ] Survival by Gender (Grouped Bar chart)
  * [ ] Survival by Passenger Class (Grouped Bar chart)
  * [ ] Age Distribution and Survival (Area chart)
  * [ ] Survival by Family Size (Line chart)

### C. Verification
* [ ] **Build Application**: Run `npm run build` inside `web-app/` to ensure clean compilation.
* [ ] **Type Checking**: Verify TypeScript builds cleanly using `tsc --noEmit`.

---

## 2. Next

* [ ] *No items scheduled for this phase yet.*

---

## 3. Later

* [ ] *No items scheduled for this phase yet.*
