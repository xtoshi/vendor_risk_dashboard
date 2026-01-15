# Vendor Risk Assessment Dashboard  
**From prompt → production in under 30 minutes**

This repository documents a real, end-to-end workflow for building and shipping a **secure, compliance-oriented web application** using AI-assisted architecture and a browser-based production environment.

The purpose of this project is not experimentation.  
It exists to show **how AI-built systems actually make it to production**.

---

## 🌐 Live Application

The application is live and running in a browser-hosted production environment:

👉 **Live URL:**  
https://vendorriskdashboard--ballyK.replit.app

This link was generated directly from the publish flow and is ready for review and sharing.

---

## 🧭 What This Repository Demonstrates

- Designing application architecture locally using AI-assisted reasoning  
- Moving cleanly from local work to a live browser environment  
- Shipping a real product without environment or infrastructure friction  
- Publishing a live URL suitable for stakeholder and security review  

**Application built:**  
**Vendor Risk Assessment Dashboard**

---

## 🎥 Build Timelapse

A fast-forward timelapse of the complete workflow (prompt → production) is available here:

👉 **Timelapse video:**  
*(Add your uploaded video link here)*

The video shows the full flow:
Claude Code → GitHub → Replit → Live Production URL

---

## ⏱ Build & Shipping Timeline

**Total time to production:** **< 30 minutes**

- **22 minutes** — Architecture & logic (local)  
- **5 minutes** — Publish & go live (browser)

---

## 📋 Campaign Compliance Summary

This project and documentation were structured to align with the **Replit “Claude & AI Curiosity” campaign brief**.

- **Campaign Window:** Jan 12 – Jan 16  
- **Track Alignment:**  
  - Primary: Track A (AI / technical builder)  
  - Secondary: Track B (decision makers)  
- **Core Message:**  
  Claude Code + Replit is a powerful workflow for shipping real products.
- **Workflow Model:**  
Local Desktop → GitHub → Replit (Shipping)

### Tone & Guardrails
- Authentic, first-hand build narrative  
- Focus on shipping outcomes  
- No competitor mentions  
- No ghost-writing or automation claims  

**System:** Windows (PowerShell / CMD compatible)

---

## 🧩 Project Overview

To demonstrate security- and compliance-oriented workflows, this project implements a:

**Vendor Risk Assessment Dashboard**

This type of application naturally requires:
- Persistent data storage  
- Secure handling of credentials  
- Auditability  
- A professional, review-ready UI  

Making it a strong example of **why a production environment matters**, not just a local terminal.

---




**##🧱 Workflow Breakdown**
1. Architecture & Logic (Local)

UI structure

Data model

Compliance and audit logic

Focused on reasoning and structure

2. Versioning

Code committed and pushed to GitHub

GitHub used as the handoff layer

3. Browser-Based Shipping

Repository imported directly into Replit

Database, secrets, and runtime handled in-browser

Missing pages and flows completed

4. Publish

Application published to a live URL

Ready for sharing, review, and iteration

🔐 Security & Compliance Notes

This project was built with compliance-sensitive patterns in mind:

Role-based access control

Append-only audit logging

Input validation at boundaries

Secrets excluded from source code

Clear separation of logic and runtime configuration

This is a demonstration project, but the patterns are suitable for internal tools and risk workflows.

🚀 Try the Workflow Yourself

You can reproduce the shipping phase here:

###👉 Replit referral link:
https://replit.com/refer/ballyK

🛠 Local Development (Optional)
npm install
npm run dev
---

Open:
http://localhost:3000
---
###📌 Why This Exists

AI-assisted coding is accelerating — but the last mile still breaks most workflows:

Turning working code into something real, live, and reviewable.

This repository shows one clean path from intent to production.

📄 License

MIT

---
## 🧠 One-Shot Prompt Used (Claude Code)

The following prompt was used to scaffold the project locally.

```text
Act as a Senior Full Stack Engineer. Build a secure Vendor Risk Assessment Dashboard using Next.js (App Router), Tailwind CSS, and Shadcn UI components.

Core Features:
- Dashboard Home: Summary of total vendors, risk levels (High, Medium, Low), pending assessments
- Vendor List: Table showing Vendor Name, Service Type, Security Score (0–100), Compliance Status (SOC2, ISO27001)
- Risk Calculation Logic: Mock function calculating risk based on missing certifications
- Secure Architecture: Prepare for PostgreSQL using environment variables (DATABASE_URL)
- UI/UX: Clean, corporate interface, dark mode by default, lucide-react icons

Technical Constraints:
- Initialize as a git repository immediately
- Modular components only
- Create a .env.example file
- Do not start a local server; scaffold and install dependencies only



---
