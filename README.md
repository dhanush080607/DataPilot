# ⚡ DataPilot

<p align="center">
  <strong>Turn raw data into decisions.</strong>
</p>

<p align="center">
  <em>An AI-powered data analytics and machine learning workspace that lets you upload a dataset, explore it visually, ask questions in natural language, build models, and generate actionable insights.</em>
</p>

<p align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge\&logo=fastapi\&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge\&logo=python\&logoColor=white)](https://www.python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)](https://www.postgresql.org/)

</p>

<p align="center">

[![GitHub](https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge\&logo=github)](https://github.com/dhanush080607/DataPilot)
[![License](https://img.shields.io/badge/License-See%20Repository-lightgrey?style=for-the-badge)](LICENSE)

</p>

---

## 🧭 The Idea

Data analysis usually looks like this:

```text
Dataset
   ↓
Open Notebook
   ↓
Clean Data
   ↓
Explore Columns
   ↓
Create Charts
   ↓
Write Python
   ↓
Build ML Models
   ↓
Interpret Results
   ↓
Write Report
```

That's powerful — but it's also repetitive.

**DataPilot is designed to bring these steps into one intelligent workspace.**

```text
                     ┌─────────────────────┐
                     │      YOUR DATA      │
                     │   CSV / Dataset     │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │    DATA PROFILER    │
                     │ Structure • Stats   │
                     │ Quality • Columns   │
                     └──────────┬──────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
        📊 Analytics       🤖 ML Engine      🧠 AI Engine
              │                 │                 │
              └─────────────────┼─────────────────┘
                                ▼
                     ┌─────────────────────┐
                     │     DATA PILOT      │
                     │  Insights & Answers │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │     DECISIONS       │
                     │ Reports • Actions   │
                     └─────────────────────┘
```

---

# ✨ What is DataPilot?

**DataPilot** is an AI-powered data analytics and machine learning platform built to make data exploration more accessible, interactive, and intelligent.

Instead of switching between notebooks, visualization tools, ML scripts, and AI assistants, DataPilot brings the workflow into a single application.

Upload your dataset.

Explore it.

Ask questions.

Analyze patterns.

Build machine-learning workflows.

Generate AI-powered insights.

And turn the results into something you can actually understand.

---

# 🎯 The Problem

Working with a new dataset often requires a lot of repetitive work.

### Traditional workflow

```text
📁 Find dataset
      ↓
🐍 Open Python / Jupyter
      ↓
🔍 Inspect dataset
      ↓
🧹 Clean data
      ↓
📊 Create visualizations
      ↓
📈 Perform statistical analysis
      ↓
🤖 Train ML models
      ↓
🧠 Interpret results
      ↓
📝 Create report
```

For beginners, students, analysts, and developers, this can become a long and fragmented process.

### DataPilot

```text
📁 Upload dataset
      ↓
⚡ Automatic profiling
      ↓
📊 Interactive analytics
      ↓
💬 Ask your data
      ↓
🤖 Machine learning
      ↓
🧠 AI-powered insights
      ↓
📄 Generate report
```

**One workspace. One dataset. One intelligent workflow.**

---

# 🚀 Core Features

## 📂 01 — Dataset Upload

Bring your dataset into DataPilot and start analyzing it without manually writing the initial exploration code.

---

## 🔎 02 — Automated Dataset Profiling

Quickly understand what you're working with.

DataPilot can analyze aspects such as:

* Dataset structure
* Columns
* Data types
* Missing values
* Statistical information
* Basic data quality characteristics
* Dataset-level summaries

Instead of starting with:

```python
df.head()
df.info()
df.describe()
df.isnull().sum()
```

you get the information through the application.

---

## 📊 03 — Interactive Data Analytics

Explore your dataset through visual analytics rather than relying entirely on terminal output or notebooks.

The frontend uses **Recharts** for interactive data visualization.

Typical analytical workflows can include:

```text
Dataset
   ↓
Select variables
   ↓
Analyze relationships
   ↓
Visualize patterns
   ↓
Interpret results
```

---

## 🤖 04 — Machine Learning

DataPilot brings machine-learning capabilities into the same analytical workflow.

The backend is built with:

* Pandas
* NumPy
* Scikit-learn

This provides the foundation for data preprocessing, analysis, and machine-learning workflows.

---

## 🧠 05 — AI-Powered Insights

DataPilot goes beyond charts and statistics.

The AI layer can transform analytical results into human-readable insights.

Instead of only seeing:

```text
Accuracy: 87.4%
```

the goal is to provide context around:

```text
What happened?
Why might it have happened?
Which variables matter?
What should I investigate next?
```

Supported AI providers in the current project include:

* Google Gemini
* OpenAI
* Ollama

---

## 💬 06 — Ask Your Data

One of the core ideas behind DataPilot is making data interactive through natural language.

Instead of asking:

> "How do I calculate the average revenue for each region?"

you should be able to ask:

> **"Which region generated the highest average revenue?"**

The goal is to bridge the gap between:

```text
Human Question
      ↓
AI Understanding
      ↓
Data Analysis
      ↓
Result
      ↓
Explanation
```

---

## 📄 07 — Report Generation

DataPilot is designed to move beyond individual charts and answers toward a complete analytical output.

The reporting workflow can bring together:

```text
Dataset Profile
      +
Analytics
      +
Visualizations
      +
ML Results
      +
AI Insights
      ↓
Analytical Report
```

---

# 🧠 Intelligence Layer

DataPilot is not intended to be just another dashboard.

Its long-term direction is an **AI-assisted analytical workflow**.

```text
                 USER
                  │
                  ▼
          ┌───────────────┐
          │ Natural Query │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │ AI Understands│
          │   Intent      │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │ Data Analysis │
          │    Engine     │
          └───────┬───────┘
                  │
          ┌───────┴────────┐
          ▼                ▼
      Statistics          ML
          │                │
          └───────┬────────┘
                  ▼
          ┌───────────────┐
          │ AI Interprets │
          │    Results    │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │   Insight     │
          │   + Action    │
          └───────────────┘
```

---

# 🏗️ Architecture

DataPilot follows a separated frontend/backend architecture.

```text
                         DATA PILOT
                             │
             ┌───────────────┴───────────────┐
             │                               │
             ▼                               ▼
    ┌─────────────────┐             ┌─────────────────┐
    │    FRONTEND     │             │     BACKEND     │
    │                 │             │                 │
    │ React           │◄───────────►│ FastAPI         │
    │ TypeScript      │     API     │ Python          │
    │ Tailwind CSS    │             │ Pandas          │
    │ Recharts        │             │ NumPy           │
    │ Axios           │             │ Scikit-learn    │
    └─────────────────┘             └────────┬────────┘
                                             │
                         ┌───────────────────┼──────────────────┐
                         │                   │                  │
                         ▼                   ▼                  ▼
                  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
                  │  AI LAYER   │    │ PostgreSQL  │    │   Analysis  │
                  │             │    │             │    │   Services  │
                  │ Gemini      │    │  Database   │    │             │
                  │ OpenAI      │    │             │    │ Profiling    │
                  │ Ollama      │    │             │    │ Analytics    │
                  └─────────────┘    └─────────────┘    │ ML          │
                                                        └─────────────┘
```

---

# 🧩 Technology Stack

| Layer            | Technology   | Role                              |
| ---------------- | ------------ | --------------------------------- |
| 🎨 Frontend      | React        | Application UI                    |
| 🟦 Language      | TypeScript   | Type-safe frontend development    |
| ⚡ Build Tool     | Vite         | Development and production builds |
| 🎨 Styling       | Tailwind CSS | UI styling                        |
| 🧭 Routing       | React Router | Client-side navigation            |
| 🌐 HTTP          | Axios        | Frontend ↔ backend communication  |
| 📊 Visualization | Recharts     | Interactive charts                |
| 🐍 Backend       | Python       | Data and application logic        |
| 🚀 API           | FastAPI      | Backend API                       |
| 🐼 Data          | Pandas       | Data manipulation                 |
| 🔢 Computing     | NumPy        | Numerical operations              |
| 🤖 ML            | Scikit-learn | Machine-learning workflows        |
| 🗄️ Database     | PostgreSQL   | Persistent data storage           |
| 🧠 AI            | Gemini       | AI-powered analysis               |
| 🧠 AI            | OpenAI       | AI provider                       |
| 🦙 Local AI      | Ollama       | Local model support               |

The current repository explicitly lists these technologies across its README and frontend package configuration.

---

# 📂 Project Structure

The repository is organized into independent frontend and backend applications.

```text
DataPilot/
│
├── backend/
│   │
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   ├── test_gemini.py
│   ├── test_insights.py
│   └── test_profiler.py
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── index.html
│
├── .gitignore
├── LICENSE
└── README.md
```

The backend currently separates API, core, schemas, services, and utilities, while the frontend is a Vite-based React application.

---

# 🔄 How DataPilot Works

```text
┌──────────────────────┐
│  1. Upload Dataset   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ 2. Profile the Data  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  3. Explore & Chart  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ 4. Ask Questions     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  5. Run Analytics    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  6. Apply ML         │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ 7. Generate Insights │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  8. Generate Report  │
└──────────────────────┘
```

---

# 🎨 Product Experience

DataPilot is being designed as more than a functional analytics tool.

The target experience is:

```text
               ┌───────────────────────────┐
               │                           │
               │        DATA PILOT         │
               │                           │
               │  Explore. Ask. Discover.  │
               │                           │
               └─────────────┬─────────────┘
                             │
             ┌───────────────┼───────────────┐
             ▼               ▼               ▼
          📊 Explore       💬 Ask          🤖 Analyze
             │               │               │
             └───────────────┼───────────────┘
                             ▼
                         🧠 Insights
                             │
                             ▼
                         🎯 Decisions
```

As the product evolves, the interface can incorporate polished micro-interactions, data-driven motion, and lightweight visual effects without compromising analytical clarity.

---

# 🧪 Testing

The backend currently includes dedicated test files for:

```text
backend/
├── test_gemini.py
├── test_insights.py
└── test_profiler.py
```

These cover important AI, insight-generation, and profiling areas of the backend.

The frontend also provides lint and production-build scripts:

```bash
npm run lint
npm run build
```

These scripts are defined in the current frontend configuration.

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have:

* Node.js
* npm
* Python 3.x
* PostgreSQL
* An AI provider/API key if using cloud AI features

---

## 1. Clone the Repository

```bash
git clone https://github.com/dhanush080607/DataPilot.git
cd DataPilot
```

---

## 2. Setup the Backend

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 3. Configure Environment Variables

Create your backend environment configuration according to the variables required by the application.

Example:

```env
DATABASE_URL=your_postgresql_connection_string

GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
```

Only configure the providers you actually use.

> ⚠️ Never commit API keys, passwords, or database credentials to GitHub.

---

## 4. Start the Backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

The API will normally be available at:

```text
http://localhost:8000
```

---

## 5. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will provide the local development URL.

---

# 🛠️ Development Commands

### Frontend

```bash
npm run dev
```

Start the development server.

```bash
npm run build
```

Create a production build.

```bash
npm run preview
```

Preview the production build locally.

```bash
npm run lint
```

Run linting.

These commands correspond to the current frontend `package.json`.

---

# 🔐 Security

DataPilot uses external AI providers and database connectivity, so sensitive configuration should always remain outside the source code.

### Never commit:

```text
❌ API keys
❌ Database passwords
❌ .env files
❌ Authentication secrets
❌ Private credentials
```

Use environment variables instead:

```text
Application
    │
    ├── Environment Variables
    │
    ├── Database Credentials
    │
    └── AI Provider Keys
```

---

# 🗺️ Roadmap

DataPilot is an evolving project.

### ✅ Foundation

* [x] React frontend
* [x] TypeScript
* [x] FastAPI backend
* [x] Dataset upload foundation
* [x] Dataset profiling
* [x] Analytics foundation
* [x] Machine-learning foundation
* [x] AI integration foundation
* [x] PostgreSQL integration
* [x] Ask Your Data concept
* [x] Report-generation foundation

### 🚧 Product Intelligence

* [ ] More robust natural-language data querying
* [ ] Deeper AI-generated insights
* [ ] Better analytical recommendations
* [ ] Improved ML workflow automation
* [ ] Stronger error handling and edge cases

### 🎨 Product Experience

* [ ] Advanced dashboard interactions
* [ ] Premium data visualizations
* [ ] Smooth UI motion
* [ ] Anime.js micro-interactions
* [ ] Carefully designed Three.js visualizations
* [ ] Improved mobile experience
* [ ] Accessibility improvements

### 🚀 Production

* [ ] Comprehensive automated testing
* [ ] Production deployment
* [ ] Performance optimization
* [ ] Better observability
* [ ] Documentation expansion
* [ ] User feedback system

> Roadmap items represent the project's direction and should not be interpreted as completed functionality.

---

# 💡 Why DataPilot?

There are countless tools that can:

* display a chart,
* calculate statistics,
* run a machine-learning model,
* or call an LLM.

DataPilot's goal is to **connect those capabilities into a single workflow**.

```text
                 ┌──────────────┐
                 │     DATA     │
                 └──────┬───────┘
                        │
                        ▼
              ┌───────────────────┐
              │    UNDERSTAND     │
              └─────────┬─────────┘
                        │
                        ▼
              ┌───────────────────┐
              │      EXPLORE      │
              └─────────┬─────────┘
                        │
                        ▼
              ┌───────────────────┐
              │      ANALYZE      │
              └─────────┬─────────┘
                        │
                        ▼
              ┌───────────────────┐
              │      EXPLAIN      │
              └─────────┬─────────┘
                        │
                        ▼
              ┌───────────────────┐
              │      DECIDE       │
              └───────────────────┘
```

**The ultimate goal is not just to analyze data.**

### It's to help people understand what their data is telling them.

---

# 🤝 Contributing

Contributions, ideas, bug reports, and feature suggestions are welcome.

```text
Fork
  ↓
Clone
  ↓
Create a branch
  ↓
Make your changes
  ↓
Test
  ↓
Commit
  ↓
Push
  ↓
Open a Pull Request
```

For significant changes, open an issue first to discuss the proposed direction.

---

# 👨‍💻 Built By

<p align="center">

<strong>Dhanush</strong>

<br/>

CSE — Data Science

<br/>

AI • Data Science • Machine Learning • Full-Stack Development

<br/><br/>

<a href="https://github.com/dhanush080607">
  <img src="https://img.shields.io/badge/GitHub-dhanush080607-181717?style=for-the-badge&logo=github" alt="GitHub"/>
</a>

</p>

---

# ⭐ Support the Project

If DataPilot is useful or interesting:

⭐ **Star the repository**

🐛 **Report bugs**

💡 **Suggest improvements**

🤝 **Contribute**

Every star and contribution helps the project grow.

---

<p align="center">

### ⚡ DataPilot

<strong>From raw data → to real understanding.</strong>

<br/><br/>

<em>Explore less manually. Understand more intelligently.</em>

</p>
