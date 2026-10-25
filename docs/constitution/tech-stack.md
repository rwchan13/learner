# Technical Stack Specification: Next.js Titanic Visualization

This document defines the selected technology stack, dependencies, design system, and deployment plan for the Titanic Survival Data Visualization Web Application.

---

## 1. Technology Stack & Dependencies

| Tool/Library | Purpose | Rationale |
| :--- | :--- | :--- |
| **Next.js 14+ (App Router)** | Framework | File-system routing, Server Components for filesystem access, optimized bundling. |
| **TypeScript** | Language | Strong types for passenger records, preventing data transformation runtime errors. |
| **Vanilla CSS & CSS Modules** | Styling | Highly customizable, native scope per component, zero runtime-CSS dependency overhead. |
| **Recharts** | Charting Engine | SVG-based, natively responsive, declarative React components with built-in smooth animations. |
| **PapaParse** | CSV Parser | Lightweight, high-performance CSV parsing with automatic header detection and type coercion. |
| **Lucide React** | Icons | Consistent, modern, lightweight SVG icons. |

---

## 2. Aesthetic & Design System

To ensure a premium, modern user interface, the application will adhere to the following design system using Vanilla CSS:

### Color Palette (Sleek Dark Mode)
* **Backgrounds**: Deep Carbon (`#0F172A`) and Slate Gray (`#1E293B`)
* **Accents (Primary/Interactive)**: Electric Cyan (`#06B6D4`) and Royal Violet (`#8B5CF6`)
* **Status Metrics**:
  * **Survived**: Emerald Green (`#10B981`)
  * **Did Not Survive**: Rose Red (`#F43F5E`)
* **Text**: Crisp White (`#F8FAFC`) and Muted Gray (`#94A3B8`)

### Typography
* **Primary Font**: `Inter` or `Outfit` (imported from Google Fonts)
* **Sizes**: Distinct hierarchy from `h1` (32px, bold) to labels (12px, semibold)

### Visual Effects
* **Glassmorphism**: Card containers using `backdrop-filter: blur(12px)` and semi-transparent borders (`border: 1px solid rgba(255, 255, 255, 0.08)`).
* **Interactive States**: Smooth `ease-in-out` transitions (150ms) on filters, sliders, and chart hovers.

---

## 3. Execution & Deployment
For initialization commands, local server configuration, and the development checklist, please refer to the project roadmap in [roadmap.md](roadmap.md).
