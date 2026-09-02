# PayWise AI 💳🤖

> **AI-Powered Payment Failure Diagnosis & Risk Assistant**  
> *Transforming opaque gateway errors into clear root causes, actionable customer recovery steps, and merchant risk insights.*

[![Render](https://img.shields.io/badge/Render-Live-success?logo=render)](https://paywise-ai-backend.onrender.com/)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react)](https://paywise-ai-backend.onrender.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js)](https://paywise-ai-backend.onrender.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb)](https://paywise-ai-backend.onrender.com/)
[![Gemini 2.5 Flash](https://img.shields.io/badge/AI-Google%20Gemini%202.5%20Flash-8E75B2?logo=google)](https://paywise-ai-backend.onrender.com/)

---

## 🔗 Quick Links

* **Live Demo:** [https://paywise-ai-backend.onrender.com/](https://paywise-ai-backend.onrender.com/)
* **GitHub Repository:** [https://github.com/vu1f2324001/Pay](https://github.com/vu1f2324001/Pay)

---

## 📌 Project Overview

**PayWise AI** is a production-ready, full-stack diagnostic platform designed to resolve payment drop-offs and uncertainty during digital checkouts. Instead of presenting consumers and operations teams with cryptic failure codes like `U30` or opaque gateway timeouts, PayWise AI processes transaction telemetry through **Google Gemini 2.5 Flash** to provide deterministic root-cause analysis, plain-language recovery steps, merchant risk scoring, and retry eligibility signals.

---

## 🚨 Problem Statement

Online checkout interruptions across UPI, Cards, and NetBanking introduce severe friction:
1. **Opaque Error Codes:** Users and support agents encounter vague technical logs (e.g., *"Transaction timed out at beneficiary bank"*), creating confusion over debited funds.
2. **Cascading Retries:** Customers repeatedly retry failing transactions during downstream bank outages, causing duplicate debits and merchant chargeback overhead.
3. **High Ticket Volume:** Support queues are swamped by low-complexity queries asking if money was deducted and what action to take next.

---

## 💡 Solution

PayWise AI bridges the diagnostic gap:
* **Plain-Language Explanations:** Decodes complex banking error codes into transparent, user-friendly explanations.
* **Deterministic Recovery Actions:** Instructs the user precisely whether to wait for auto-reversal or switch payment rails.
* **Intelligent Retry Guidance:** Evaluates failure telemetry to flag whether an immediate retry is safe or guaranteed to fail.
* **Merchant Risk Scoring:** Categorizes transaction risk levels (`Low`, `Medium`, `High`) to detect systemic payment rail degradation.

---

## ✨ Key Features

* **Instant Generative AI Diagnosis:** Analyzes transaction ID, amount, payment rail, error code, and error messages using Google Gemini 2.5 Flash.
* **Telemetry Dashboard:** Live high-level metric cards for total transactions, successful checkouts, failed payments, and success rate calculation.
* **Interactive Diagnostic Form:** Pre-loaded test cases with real-time field editing for fast triage.
* **Categorized Risk & Retry Badges:** Visual risk status tags and deterministic retry indicators (`Yes` / `No`).
* **Monolithic Full-Stack Runtime:** High-performance Express server simultaneously delivering REST API endpoints and serving compiled Vite/React static assets.

---

## ⚙️ How the Application Works

1. **Telemetry Capture:** The user inputs or tests transaction data (Transaction ID, Amount, Payment Method, Error Code, Error Message).
2. **API Dispatch:** The client issues an asynchronous `POST /api/analyze-payment` request to the Express server using relative routing.
3. **LLM Orchestration:** The backend constructs an evaluation prompt and interfaces with Google Gemini 2.5 Flash via `@google/genai`.
4. **Strict JSON Parsing:** The AI generates a structured, machine-readable JSON object containing the diagnostic title, detailed explanation, recommended action, retry flag, and risk category.
5. **UI Rendering:** The React frontend parses the structured payload and updates the diagnostic card with color-coded risk tags.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["Client Tier (Browser)"]
        UI[React + Vite Dashboard]
        Form[Payment Failure Input Form]
        Card[AI Diagnosis Result Card]
        Metrics[Transaction Metrics Bar]
        UI --> Form
        UI --> Metrics
        Card --> UI
    end

    subgraph Server ["Server Tier (Node.js & Express Monolith)"]
        Express[Express Core Engine]
        Static[Static Asset Server: frontend/dist]
        Routes[Route Handler: /api/analyze-payment]
        Controller[Payment Controller]
        GeminiService[Gemini 2.5 Flash Service]

        Express --> Static
        Express --> Routes
        Routes --> Controller
        Controller --> GeminiService
    end

    subgraph DataAI ["External Services & Storage"]
        GeminiAPI[Google Gemini 2.5 Flash Engine]
        Mongo[(MongoDB Atlas Database)]
    end

    Form -- "POST /api/analyze-payment" --> Routes
    Static -- "Serves index.html & JS/CSS" --> UI
    GeminiService -- "@google/genai SDK" --> GeminiAPI
    GeminiAPI -- "Structured JSON Diagnostics" --> GeminiService
    Controller -. "Transaction Logging / Seed Data" .-> Mongo
    Controller -- "JSON Response { success, analysis }" --> Card

