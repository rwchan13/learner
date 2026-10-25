# Titanic Survival Intelligence Dashboard

An interactive, high-fidelity web application visualizing demographic and socioeconomic correlations associated with passenger survival rates during the Titanic maritime disaster.

---

## 🧭 Project Signposting

To understand the objectives, layout, and implementation of this project, refer to the core constitution documents in `docs/constitution/`:

* 🎯 **[Project Mission](docs/constitution/mission.md)**: Hypotheses, target correlations (gender bias, class disparity, age prioritize, family size impact), and visual variables analysis.
* 🛠️ **[Technical Stack Specification](docs/constitution/tech-stack.md)**: Libraries list (Next.js, PapaParse, Recharts, TypeScript) and theme visual tokens (glassmorphism details).
* 📐 **[System Architecture](docs/constitution/architecture.md)**: Server components loader pipeline, client-side filters data flow, and complete codebase directory maps.
* 🗺️ **[Development Roadmap](docs/constitution/roadmap.md)**: Project Milestones (Now / Next / Later checklisted tasks).

---

## 🚀 Getting Started

The dashboard is built using the Next.js App Router framework. Follow these commands to install dependencies and launch the local server.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18 or higher) installed on your system.

### 1. Installation
Navigate to the web-app directory and install dependencies:
```bash
cd web-app
npm install
```

### 2. Launch Local Dev Server
Start the local server in development mode:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to interact with the dashboard.

### 3. Production Build
To create an optimized production compilation:
```bash
npm run build
```
Verify compilation completes without errors, checking type interfaces and code bundling.

---

## 📊 Dataset Reference
The visualizer reads passenger data locally from:
* **[Titanic-Dataset.csv](data/Titanic-Dataset.csv)** (891 passenger records containing gender, age, class, fares, and survival parameters).
