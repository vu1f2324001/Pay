# 💳 PayWise AI — Payment Failure Assistant
> **Razorpay AI Builder Internship Demo**  
> An intelligent payment diagnostics dashboard that transforms raw gateway error codes into clear, actionable recovery insights using Google Gemini.

---

## 📌 Executive Summary

Payment failures cause direct revenue loss and customer frustration. Developers and support agents often struggle with cryptic error codes (`GATEWAY_TIMEOUT`, `BAD_REQUEST_ERROR`, `U30`), while end customers are left guessing whether their money was deducted.

**PayWise AI** solves this by:
1. Translating raw gateway errors into plain, customer-friendly explanations.
2. Assessing immediate transaction risk (**Low / Medium / High**).
3. Advising whether a safe retry is possible or if an alternate payment method is required.
4. Logging all payment attempts and AI recommendations for audit and analytics.

---

## 🚀 Key Features

* **📊 Live Analytics Dashboard:** Track Total Transactions, Success vs. Failure counts, and real-time Success Rate (%).
* **🤖 Gemini AI Diagnostics Engine:** Generates structured root cause analysis (`reason`, `explanation`, `recommendedAction`, `retry`, `riskLevel`).
* **⚡ One-Click Scenarios:** Pre-loaded with typical real-world gateway failure events (UPI timeouts, international limits, card declines).
* **📜 Transaction & AI History:** Persists analyzed events in MongoDB for historical reporting and audit trails.
* **🛡️ Architecture Ready for Razorpay Test Mode:** Isolated service layer for sandbox verification without leaking secrets.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Bootstrap 5 |
| **Backend** | Node.js, Express.js (ES Modules) |
| **Database** | MongoDB (via Mongoose) |
| **AI Engine** | Google Gemini API (`gemini-2.5-flash` via `@google/genai`) |
| **API Architecture** | RESTful JSON endpoints |

---

## 📂 Project Architecture

```text
paywise-ai/
├── backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection logic
│   │   ├── controllers/     # API route handlers & orchestration
│   │   ├── models/          # Mongoose Transaction Schema
│   │   ├── routes/          # Express route definitions
│   │   ├── services/        # Gemini AI & Razorpay API services
│   │   ├── seed/            # Mock dataset for instant testing
│   │   └── app.js           # Express app instance setup
│   ├── .env.example
│   ├── package.json
│   └── server.js            # Server entrypoint
├── frontend/
│   ├── src/
│   │   ├── components/      # Modular UI components (Cards, Forms, Tables)
│   │   ├── App.jsx          # Main application view & state manager
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
└── README.md
