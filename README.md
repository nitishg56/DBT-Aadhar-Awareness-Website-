# DBT Awareness & Verification Portal

A full-stack, role-based web platform designed to improve **Direct Benefit Transfer (DBT) awareness, verification, and transparency** for students and Gram Panchayat officials through digital workflows, analytics, and guided resources.

🌐 **Live Demo:** [https://dbt-bxvo.onrender.com/](https://dbt-bxvo.onrender.com/)

🎨 **UI Design (Figma):**
[https://www.figma.com/design/sp2Bqh0Iw6DRDS3C4Bc2sr/DBT-Awareness-Portal-Design](https://www.figma.com/design/sp2Bqh0Iw6DRDS3C4Bc2sr/DBT-Awareness-Portal-Design)

---

## 🚀 Project Overview

The **DBT Awareness & Verification Portal** digitizes government-style DBT processes by providing:

* Student awareness & verification workflows
* Panchayat-level dashboards and analytics
* Event management and reporting
* Secure document handling and downloads
* Interactive village coverage maps

The system is designed with **scalability, transparency, and audit readiness** in mind.

---

## 👥 User Roles

### 👨‍🎓 Student

* DBT awareness guides & tutorials
* Aadhaar–Bank linking guidance
* Bank verification request submission
* Verification status tracking
* Quizzes for DBT awareness
* Download official guidelines and manuals

### 🏛️ Panchayat Officer

* Panchayat dashboard with DBT metrics
* Student DBT status monitoring
* Event scheduling (awareness camps, verification drives)
* Event report uploads with photos
* Auto-generated reports (PDF / Excel / CSV)
* Village-wise DBT coverage map
* Access to official training resources

---

## ✨ Key Features

* 🔐 **Role-Based Access Control (RBAC)**
* 📊 **Analytics Dashboards & Charts**
* 🗺️ **Interactive Village Coverage Map (Leaflet)**
* 📄 **PDF / Excel / CSV Report Generation**
* 📤 **Document Upload & Download System**
* 🧠 **DBT Awareness Quizzes**
* 🧾 **Government-style Audit-Ready Reports**
* 📱 **Responsive UI (Mobile + Desktop)**

---

## 🛠️ Tech Stack

**Frontend**

* React (TypeScript)
* Tailwind CSS
* Lucide Icons
* Recharts (Analytics)
* Leaflet (Maps)

**Backend / Services**

* Supabase (Authentication, Database, Storage, RLS)
* REST APIs

**Utilities**

* jsPDF (PDF generation)
* OpenStreetMap tiles

---

## 📂 Project Structure (Simplified)

```
src/
 ├── components/
 │   ├── dashboards/
 │   │   ├── StudentDashboard.tsx
 │   │   └── PanchayatDashboard.tsx
 │   ├── shared/
 │   └── ui/
 ├── contexts/
 ├── supabaseClient.ts
public/
 └── resources/
     ├── student-downloads/
     └── panchayat-resources/
```

---

## ⚙️ Running the Project Locally

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start development server

```bash
npm run dev
```

The app will run on:

```
http://localhost:5173
```

---

## 🔐 Security & Best Practices

* Role-based access enforcement
* Input validation on all forms
* Controlled file downloads from public resources
* Separation of UI, logic, and data layers
* Scalable dashboard architecture

---

## 🎯 Use Cases

* Government DBT awareness programs
* Panchayat-level DBT tracking & monitoring
* Student onboarding for DBT schemes
* Hackathons, Smart India Hackathon, GovTech demos
* Academic / portfolio projects

---

## 📌 Future Enhancements

* AI-based fraud detection for DBT verification
* Predictive analytics for DBT enablement
* SMS / Email notifications
* Multilingual support
* Admin approval workflows

---

## 👨‍💻 Author

**Nitish Gupta**
B.Tech CSE | Full-Stack Developer | GovTech Enthusiast

🌐 Live Demo: [https://dbt-bxvo.onrender.com/](https://dbt-bxvo.onrender.com/)

---
