# Journey Builder React Coding Challenge – Avantos

This is my submission for the Avantos frontend coding challenge. It implements a simplified prefill configuration UI for a DAG of forms using React and TypeScript.

## Features

- Fetches a DAG of forms from a mock server
- Displays a list of available forms
- Shows prefill configuration for each field of a selected form
- Allows setting prefill values from:
  - Directly dependent forms
  - Transitively dependent forms
  - Global data (e.g., `user_email`, `org_id`)
- Clicking a field opens a modal to configure its prefill
- Allows clearing existing mappings
- Fully scrollable modal UI for large lists
- Modular and extensible structure for adding future data sources


##  Getting Started

### 1. Clone both repositories

```bash
git clone https://github.com/YOUR_USERNAME/journey-builder-frontend.git
### https://github.com/nirali112/journey-builder-frontend.git

git clone https://github.com/mosaic-avantos/frontendchallengeserver.git


### 2. Run the Mock Server

cd frontendchallengeserver
npm install
npm run start
# Server starts at http://localhost:3000

### 3. Run the React App
cd journey-builder-frontend
npm install
npm run dev
# App runs at http://localhost:5173

🗂 Project Structure

src/
├── components/              # UI components
│   ├── FormList.tsx
│   ├── PrefillConfigPanel.tsx
│   └── PrefillModal.tsx
├── utils/                   # DAG traversal logic
│   └── graph.ts
├── data/                    # Global prefill data
│   └── globalData.ts
├── services/                # API fetches
│   └── api.ts
├── types/                   # Shared TypeScript types
│   └── index.ts
└── App.tsx                  # Main UI logic

👩‍💻 Tech Stack

React (Vite)
TypeScript
Node.js (mock backend)
Plain CSS-in-JSX

📹 Demo Video
Unlisted YouTube Link – https://youtu.be/apW-F1pgyww

This video shows the application in action and a short walkthrough of the key parts of the codebase.

📬 Contact
Submitted by: Nirali Mehta
Email: niralimehta997@gmail.com
GitHub: github.com/nirali112
