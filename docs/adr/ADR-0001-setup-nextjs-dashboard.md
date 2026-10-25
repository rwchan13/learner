# ADR-0001: Next.js Interactive Dashboard for Titanic Visualization

## Status
Accepted

## Context
We need to visualize passenger data from `/data/Titanic-Dataset.csv` to investigate relationships between demographics, ticket fares, class, family size, and survival rates. The user wants to view this as a web page rather than static images or command-line scripts. We need a framework that can handle local file parsing on the server (security and performance) and dynamic, reactive charting on the client.

## Decision
We select **Next.js (App Router, React, TypeScript)** as the core framework, utilizing **PapaParse** for server-side CSV parsing, and **Recharts** for SVG charting. 

### Rationale
* **React Server Components (RSC)**: Allows reading the CSV dataset directly from the local filesystem using Node `fs/promises`. The dataset never has to be transferred raw to the client or served via public HTTP endpoints, improving page load performance.
* **Recharts**: Offers a highly responsive React visualization layer with built-in animations that animate charts automatically when filters change.
* **TypeScript**: Enforces strict types on parsed passenger fields to prevent data coercion bugs.
* **Vanilla CSS / CSS Modules**: Avoids external styling library bloat and maintains full layout design freedom (implementing custom glassmorphism grids).

## Alternatives Considered
1. **Python Streamlit Dashboard**: 
   * *Why rejected*: Extremely fast to build, but lacks layout customizability and does not allow full bespoke web design.
2. **Next.js + D3.js**: 
   * *Why rejected*: Extremely flexible, but requires substantial mathematical boilerplates. Recharts wraps SVG charts in clean React components, aligning with the "Simplicity First" core tenet.

## Consequences
* **Benefits**: Ultra-fast page load (HTML pre-rendered on the server), clean interactive experience, and local data protection.
* **Liabilities**: Next.js requires a Node environment for initialization and running locally, raising developer setup time relative to simple Python scripts.
* **Alignment with Constitution**:
  * *Simplicity First*: Standard charts are rendered using simple Recharts wrappers.
  * *Modularity*: Separates server-side filesystem loader from client-side filters.
  * *Security*: Protects the raw CSV file on the server.
