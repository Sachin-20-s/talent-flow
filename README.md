# TalentFlow - A Mini HR Management Platform (Frontend Only)
TalentFlow is a React-based application that enables HR teams to post jobs, review candidates, and manage assessments for specific roles all in a frontend-only environment with local persistence and a simulated API.


### Issues due SPA(Single page rendering) website on Render 
#### Some deep links may not persist state perfectly after full reload

## Login : <img width="640" height="576" alt="image" src="https://github.com/user-attachments/assets/5edd34d0-607b-4f84-b381-f11f80070b46" />
### Username :: Sachin_HR (Mind the case)
### Password :: Sachin@123 (Mind the case)

## Login page : <img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/1f10c055-332c-43b7-aada-f7f6cc03f19b" />
## Home page : <img width="1918" height="906" alt="image" src="https://github.com/user-attachments/assets/45c5719f-8e49-487c-9149-c99ca889c12c" />
## All jobs posted page : <img width="1919" height="919" alt="image" src="https://github.com/user-attachments/assets/c8b05224-1ed4-476a-a7c1-a9e3dc714aac" />
## All Applicants page : <img width="1919" height="916" alt="image" src="https://github.com/user-attachments/assets/121511d5-9470-4121-81e4-3d81341e8f03" />
## All assessments page : <img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/d337b314-9d1b-4d69-bd69-36c03440d7fa" />
## Detailed Job view : <img width="1919" height="909" alt="image" src="https://github.com/user-attachments/assets/aef0b774-f86b-485c-b8db-af162195cf66" />
## Asessment Page : <img width="1919" height="915" alt="image" src="https://github.com/user-attachments/assets/80112e6f-076f-42e4-ab1b-6493bd911454" />
## Applicant profile : <img width="1919" height="917" alt="image" src="https://github.com/user-attachments/assets/050a0005-fc69-4cf0-be6c-986e664904c3" />

## To check detailed view of jobs and assessments click on applicants -> click on any applicant name -> now click on any job titles present -> detailed view of job -> view assessments from the same page 

### Jobs
- List with pagination, filtering (title, status, tags).
- Create / Edit jobs with validation (unique slug, required title).
- Archive / Unarchive jobs.
- Deep link: `/jobs/:jobId`.

### Candidates
- Virtualized list (1,000+ seeded candidates).
- Search by name/email, filter by stage.
- Candidate profile with timeline of stage changes (`/candidates/:id`).
- Kanban board to move candidates across stages (drag-and-drop).

### Assessments
- Job-specific assessment builder.
- Supports question types: single-choice, multi-choice, short text, long text, numeric (with ranges), and file upload stub.
- Live preview pane for builder.

## Architecture & Design

### High-Level
- **Frontend Framework:** React + Vite  
- **UI / State:** React hooks, Redux Toolkit (for complex state & optimistic updates).  
- **Routing:** React Router (`/jobs`, `/candidates`, `/assessments`).  
- **Persistence:** IndexedDB (via Dexie / localForage).  
- **Mock API Layer:** MSW / MirageJS (simulates REST endpoints, artificial latency & errors).  
- **Styling:** TailwindCSS + utility classes.  
- **Virtualization:** `react-window` for large candidate lists.  
- **Drag & Drop:** `@dnd-kit/core` for jobs reordering and candidate Kanban.  

### Data Flow
1. UI → API Layer (MSW/Mirage) → IndexedDB (write-through).  
2. On refresh, IndexedDB restores persisted jobs, candidates, assessments.  
3. Artificial latency (200–1200ms) + 5–10% error rate → tests resilience.  

### Folder Structure (simplified)

src/
├── api/ # MirageJS / MSW mocks
├── components/ # Reusable UI components
├── features/
│ ├── jobs/ # Jobs board, modals, reorder logic
│ ├── candidates/ # Virtualized list, Kanban, profiles
│ └── assessments/ # Builder + runtime form
├── store/ # Redux slices
├── utils/ # Helpers (slug generation, validators)
├── App.jsx
└── index.jsx


## Setup & Local Development

### Installation
git clone https://github.com/Sachin-20-s/talent-flow.git
cd talent-flow
npm install  


### Technical Decisions

#### API Simulation: Chose MSW / MirageJS to mimic a real REST API with artificial latency and errors. Trade-off: slightly more setup complexity compared to simple static mocks.
#### Persistence: Used IndexedDB via Dexie / localForage to survive page refreshes and handle large datasets. Trade-off: more boilerplate than using localStorage.
#### State Management: Redux Toolkit was used for centralized control over asynchronous flows and optimistic updates. Trade-off: adds boilerplate compared to pure React hooks.
#### UI: TailwindCSS enables fast prototyping and responsive utilities. Trade-off: less semantic than CSS-in-JS.
#### Drag & Drop: Implemented using dnd-kit for robust reorder and Kanban functionality. Trade-off: has a learning curve.
#### Virtualization: Used react-window for smooth rendering of 1,000+ candidates. Trade-off: limited feature set compared to react-virtualized.


### Deployment
#### Platform: Render
#### Build Command: npm run build
#### Static Output Directory: dist
#### Live Demo: https://talent-flow-6.onrender.com







