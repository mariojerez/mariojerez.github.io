# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173 (with HMR)
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

The dev server is exposed on port 5173 via Docker (see `docker-compose.yml`). Run `npm run dev -- --host` inside the container so Vite binds to all interfaces.

## Project Purpose

This is the personal academic website of **Mario Jerez**, a Computer Science PhD student at the University of Minnesota researching swarm intelligence and multi-robot systems (advised by Dr. Maria Gini). The stack is **Vite + React (JSX, no TypeScript)**.

Design intent: professional, modern, minimalistic, with a subtle swarm robotics aesthetic.

## Architecture

### Data Layer — CSV Files as Database

All content (experiences, publications, projects, education, awards, etc.) lives in CSV files under `public/data/`. This is the core architectural decision: adding a new entry to the site means adding a row to a CSV, not touching React code.

- Each CSV represents one content type (e.g., `experience.csv`, `publications.csv`, `education.csv`, `projects.csv`, `awards.csv`, `volunteer.csv`, `coursework.csv`, `skills.csv`)
- Every entry with a time span has `start_date` and `end_date` columns (ISO format; `end_date` can be `"present"`)
- Text fields support inline HTML for links: e.g., `<a href="https://...">label</a>` for external links and `<a href="#section">label</a>` for internal anchor navigation
- CSV files are fetched at runtime via `fetch('/data/filename.csv')` and parsed in a shared utility

### Data Loading

`src/utils/csvLoader.js` — shared utility that fetches and parses CSV files. Handles the inline HTML link notation. All components use this instead of importing data directly.

### Timeline Display

The primary UI pattern is a **vertical timeline** sorted by date. All time-bound content types (experience, education, projects, research) are rendered via a shared `Timeline` component that:
- Accepts an array of entries with `start_date`/`end_date`
- Renders them in chronological order (most recent first)
- Each entry is clickable and expands into a detail modal/panel showing full description and bullet points

### Component Structure

```
src/
  components/
    SwarmBackground.jsx     # Fixed canvas animation: 32 agents, cyan dots + connection lines
    layout/
      Navbar.jsx            # Fixed top nav; uses IntersectionObserver for active section
      Footer.jsx
    sections/               # One component per page section, each loads its own CSV
      Hero.jsx              # Full-viewport hero with name, bio, CTA, social links
      About.jsx             # Static bio paragraph
      ResearchSection.jsx   # Timeline from research.csv
      PublicationsSection.jsx  # Card list from publications.csv
      ExperienceSection.jsx    # Two sub-timelines: experience.csv + teaching.csv
      EducationSection.jsx     # Timeline from education.csv (no expand toggle)
      AwardsSection.jsx        # Card list from awards.csv
      SkillsSection.jsx        # Tag groups from skills.csv
      ContactSection.jsx       # Static contact links
    ui/
      TimelineEntry.jsx     # Accordion card: collapsed = title+sub+dates+desc, expanded = bullets+tags+link
      Tag.jsx               # Pill badge
  utils/
    csvLoader.js    # CSV fetch + parse; exports loadCSV, parseList, useCSV hook
    dateUtils.js    # parseDate, formatDate, formatYear, formatDateRange, sortByDateDesc
App.jsx             # Composes all sections
index.css           # All styles via CSS custom properties; no external CSS framework
App.css             # Minimal: #root and main positioning only
```

### Styling

Plain CSS with CSS custom properties (no CSS-in-JS, no Tailwind). All styles in `src/index.css`. Color scheme: dark navy (`--bg: #07101e`), cyan accent (`--accent: #22d3ee`). The swarm animation runs in a fixed-position `<canvas>` behind all content (`z-index: 0`), with sections at `z-index: 1`.

### Adding Content

To add a new entry to any section, add a row to the corresponding CSV in `public/data/`. The `highlights` and `tools`/`items` fields use `|` as a pipe separator for multiple values. HTML links using single-quoted attributes (e.g. `<a href='url'>text</a>`) are supported in any text field and rendered via `dangerouslySetInnerHTML`.

## Content to Include

All of the following must be represented in the site (sourced from the resume at `old_site/files/Mario_Jerez_Resume.tex`):

- **About**: PhD student in CS at UMN, swarm intelligence / multi-robot systems focus, bio-inspired decentralized systems
- **Contact**: jerez005@umn.edu | (980) 242-9090 | linkedin.com/in/mario-jerez | github.com/mariojerez
- **Education**: PhD CS UMN (Sept 2024–present, GPA 3.95), BA Sarah Lawrence College (2018–2021, GPA 3.96), IB Diploma Keystone Academy Beijing (2016–2018)
- **Awards**: Excellence in Small Farms Technology Award (2025), NSF Circularity Impact Program travel award (2025), Hispanic Scholarship Fund Scholar (2019)
- **Publications**: two papers (arXiv:2505.10770 GUARD paper; ACO coverage path planning ICRA 2025 workshop paper)
- **Research Projects**: UAV deer deterrence system (Jan–Apr 2025), Luminescent Ant Foraging (Nov 2024–present)
- **Experience**: NASA Ames intern (June–Aug 2025), FAST Enterprises (Feb 2023–Aug 2024), Avolution Inc. (Aug 2021–Sep 2022)
- **Teaching**: GTA UMN (Aug 2024–present), GoPeer tutor (2020–2021), Sarah Lawrence tutoring, Keystone teaching fellow, Keru program mentor
- **Skills**: Languages, Libraries & Frameworks, Tools (see resume Technologies section)

The `old_site/` directory will be deleted; do not reference it in code.
