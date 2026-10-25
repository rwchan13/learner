# Repository Agent Guidelines: Development Method

This document defines the development method, standards, and rules for all AI coding agents working in this repository. All agent tasks must strictly adhere to these three phases, each ending in a mandatory hardstop for user reflection.

---

## Phase 1: Discussion, Planning & Architecture

Before executing any changes (beyond simple, non-disruptive investigatory queries), the agent must engage in research, architectural design, and plan alignment.

### 1. Research and Analysis
* **Understand the Codebase**: Search files, understand dependencies, structures, and existing patterns related to the task.
* **Identify Constraints**: Check for existing configurations, environment variables, or architectural rules that might restrict options.

### 2. Architectural Decision Records (ADRs) & Project Constitution
For any significant design decisions (e.g., introducing a new dependency, shifting framework architecture, defining API design, changing the storage engine):
* **Adhere to the Project Constitution**: Every code addition or modification must align with these core tenets:
  * **Simplicity First**: Code should be readable, clean, and avoid premature optimization or over-engineering.
  * **Modularity**: Components and functions should have a single responsibility, clear boundaries, and minimal tight coupling.
  * **Security & Reliability**: Validate all inputs, handle errors gracefully, and protect secrets. Never hardcode credentials.
  * **Testability**: Structure code to facilitate testing (e.g., dependency injection, pure functions).
* **Create/Update ADRs**: Draft a new ADR in `docs/adr/ADR-XXXX-title.md` (where `XXXX` is a sequential 4-digit number) and set its status to **Proposed**. Keep the index in `docs/adr/README.md` updated.
* **ADR Format**:
  * **Title**: ADR-XXXX: [Short Title]
  * **Status**: Proposed / Accepted / Superseded
  * **Context**: What is the problem or opportunity we are addressing?
  * **Decision**: What is the chosen solution and why? How does it align with the Project Constitution?
  * **Alternatives Considered**: What other options were evaluated, and why were they rejected?
  * **Consequences**: What are the trade-offs, benefits, and liabilities introduced by this decision?

### 3. Implementation Proposal
* For non-trivial tasks, draft or update an implementation plan (`implementation_plan.md`).
* The plan must include:
  * **Goal**: Clear description of the objective and requirements.
  * **Proposed Changes**: Detail which files will be created, modified, or deleted, including function/class designs.
  * **Architectural Impact**: Reference any drafted ADRs.
  * **Verification Plan**: List of tests and manual verification steps.
  * **Open Questions**: Explicitly highlight design choices, trade-offs, or ambiguities requiring user input.

### 4. Planning Alignment [HARDSTOP]
* **Stop and Present**: Stop execution and present the implementation plan (and any proposed ADRs) to the user.
* **Review Gate**: Do not proceed to implementation or make code modifications until the user explicitly reviews and approves the plan. Once approved, update any proposed ADRs to **Accepted**.

---

## Phase 2: Implementation & Validation

Once the plan is approved and any architectural decisions are accepted, proceed to safe execution and verification.

### 1. Safe Execution
* **Task Checklist**: Create or update `task.md` to track implementation progress.
* **Incremental Changes**: Make changes in logical, contiguous, and testable blocks. Avoid massive, untested code dumps.
* **Preserve Integrity**: Retain existing docstrings, comments, and structure unless explicitly directed or required for the change.

### 2. Testing & Validation
* **Automated Tests**: Run all relevant existing unit and integration tests. Add new tests covering new code paths.
* **Manual Verification**: Perform manual validation (e.g., checking outputs, verifying API responses, testing edge cases) to ensure the implementation is correct and robust.
* **Regression Prevention**: Ensure no existing functionality is broken.

### 3. Walkthrough & Documentation
* Create or update a walkthrough document (`walkthrough.md`) summarizing:
  * The changes made (referencing the modified files).
  * The test commands run and their results.
  * Instructions or examples demonstrating how the user can verify the change.

### 4. Validation Alignment [HARDSTOP]
* **Stop and Present**: Stop execution and present the final `walkthrough.md` containing the validation results to the user.
* **Review Gate**: Do not proceed to Phase 3 (Post-Implementation & Knowledge Capture) until the user has reviewed the code changes and verified their correctness.

---

## Phase 3: Post-Implementation & Knowledge Capture

To maintain long-term developer experience and prevent recurring issues, reflect on the implementation process.

### 1. Identify Lessons Learned & Setup Gotchas
* Document any unique dependencies, configuration tweaks, compilation fixes, or environment setups required for the task.
* Note any architectural trade-offs or technical debt introduced during implementation.

### 2. Share Knowledge & Refine Guidelines
* If the task involved resolving a complex setup or correcting a specific agent behavior pattern:
  * Propose updating the repository's guidelines or `.agents/AGENTS.md` rules.
  * Propose packaging any repeatable workflows or configurations into reusable custom skills.
* Highlight these recommendations in the final walkthrough or closing message to the user.

### 3. Final Reflection [HARDSTOP]
* **Stop and Share**: Stop execution and present the gathered lessons learned, proposed guideline updates, and future recommendations to the user.
* **Review Gate**: Wait for the user to review the captured knowledge, approve any guideline changes, and explicitly sign off to close the task.
