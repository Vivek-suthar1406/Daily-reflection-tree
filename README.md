# DT Fellowship Assignment: The Daily Reflection Tree

This repository contains my submission for the DeepThought Growth Teams Fellowship assignment. It includes both Part A (the deterministic tree design) and Part B (a fully functional React web agent).

## 📂 Repository Structure

* **`reflection-tree.json`**: The core data structure containing 26 nodes, fixed options, deterministic routing rules, and signal tallies. 
* **`tree-diagram.md`**: A visual representation of the tree's flow using Mermaid.js.
* **`write-up.md`**: A 2-page rationale explaining the psychological grounding (Rotter, Organ, Maslow), the branching design, and the UX trade-offs.
* **`reflection-tree/`**: The source code for the Part B React web application.
* **`transcripts/`**: Markdown files showing two distinct, end-to-end user paths through the agent.

---

## 🚀 Part B: How to Run the Agent

I built a deterministic, client-side web application using React (Vite) and Tailwind CSS to walk users through the reflection tree. The app reads directly from the JSON file and uses a local state manager to tally signals and handle routing without any LLM API calls.

To run the agent locally:

**1. Clone the repository and navigate into the app folder:**
```bash
git clone [https://github.com/Vivek-suthar1406/Daily-reflection-tree.git](https://github.com/Vivek-suthar1406/Daily-reflection-tree.git)
cd Daily-reflection-tree/reflection-tree
2. Install the dependencies:

Bash
npm install
3. Start the development server:

Bash
npm run dev
The application will launch on your local host (typically http://localhost:5173).

🧠 Design Philosophy
This tool was designed not just as a survey, but as an intuitive workflow. The UI utilizes soft, cinematic aesthetics and smooth transitions to make the end-of-day reflection feel like a calming ritual, validating the user's current cognitive state while gently guiding them toward agency and perspective-taking.