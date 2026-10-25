# Titanic Data Visualization Mission

## Objective
The mission of this project is to explore, analyze, and visualize the [Titanic Dataset](../../data/Titanic-Dataset.csv) to discover and illustrate key patterns and correlations associated with passenger survival.

Specifically, we want to visually investigate the "women and children first" social protocol, socioeconomic disparities in survival rates, and family dynamics during the maritime disaster.

---

## Dataset Description

The dataset contains the following features for 891 passengers:

| Feature | Description | Key Details / Types |
| :--- | :--- | :--- |
| **Survived** | Survival status (Target Variable) | `0` = No, `1` = Yes |
| **Pclass** | Passenger ticket class | `1` = 1st (Upper), `2` = 2nd (Middle), `3` = 3rd (Lower) |
| **Name** | Passenger name | Text |
| **Sex** | Passenger sex | `male`, `female` |
| **Age** | Passenger age | Numerical (includes fractional and missing values) |
| **SibSp** | Number of siblings or spouses aboard | Numerical |
| **Parch** | Number of parents or children aboard | Numerical |
| **Ticket** | Ticket number | Alphanumeric |
| **Fare** | Passenger fare paid | Numerical |
| **Cabin** | Cabin number | Alphanumeric (many missing values) |
| **Embarked** | Port of embarkation | `C` = Cherbourg, `Q` = Queenstown, `S` = Southampton |

---

## Key Hypotheses & Visualizations

We will construct visualizations to test and illuminate the following connections:

### 1. Gender Bias in Survival (`Sex` vs `Survived`)
* **Hypothesis**: Female passengers had significantly higher survival rates than male passengers.
* **Proposed Visuals**: 
  * Grouped bar charts/countplot showing survival rates by gender.
  * Stacked percentage charts representing the gender composition of survivors vs. non-survivors.

### 2. Socioeconomic Disparities (`Pclass` & `Fare` vs `Survived`)
* **Hypothesis**: Higher socioeconomic status (1st Class, high fares) correlates with higher survival rates.
* **Proposed Visuals**:
  * Bar plot comparing survival rate across `Pclass` (1st, 2nd, and 3rd).
  * KDE (Kernel Density Estimate) plots or box plots showing the distribution of `Fare` for survivors vs. non-survivors.

### 3. Age Dynamics (`Age` vs `Survived`)
* **Hypothesis**: Children (low age) were prioritized and had higher survival rates.
* **Proposed Visuals**:
  * Age distribution histogram overlaid with survival status (hue).
  * Violin plots showing age distributions across passenger classes and survival status.

### 4. Family Size & Composition (`SibSp` + `Parch` vs `Survived`)
* **Hypothesis**: Traveling alone or traveling with extremely large families decreased survival likelihood, while small family units had a survival advantage.
* **Proposed Visuals**:
  * Feature engineered variable `FamilySize = SibSp + Parch + 1`.
  * Line plot or bar plot showing survival rate by family size.

### 5. Multi-Variable Interaction (Socio-Demographic Heatmap)
* **Hypothesis**: The combination of `Sex`, `Pclass`, and `Age` creates distinct clusters of high/low survival probability.
* **Proposed Visuals**:
  * FacetGrid of survival rate across class and gender.
  * Correlation heatmap of numerical features after encoding categorical variables.

---

## Project Roadmap
For the detailed execution steps, tech stack configuration, and architecture details, refer to:
* [roadmap.md](roadmap.md) (Roadmap & Checklists)
* [tech-stack.md](tech-stack.md) (Libraries & Design System)
* [architecture.md](architecture.md) (Component Layout & Data Flow)
