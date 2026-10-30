# Legends-of-Treta

> **HERINOVA GAME STUDIOS presents**  
> An epic AAA Ramayana-themed action RPG crafted in Unreal Engine 5 & Next.js. Official Campus Recruitment & Academic Partnership Portal for MRIIRS, MRU, and Partner Universities.

---

## 🏹 Project Overview

**Legends of Treta** is an immersive interactive web experience and talent recruitment portal for Herinova Game Studios' upcoming AAA title set in the Treta Yuga.

- **Interactive 3D Temple Experience:** WebGL and Three.js canvas featuring the Golden Bow of Rama, Kasane scroll narrative engine, and Vedic visual art.
- **Campus Placement Recruitment Sabha:** Dedicated job board and modal application flow for Engineering, Narrative Lore, 3D Art, and Gameplay logic roles.
- **Firebase Firestore Integration:** Cloud-backed application database with real-time status tracking.
- **Instant WhatsApp Recruiter Dispatch:** Zero-setup pre-formatted application transmission directly to recruiter WhatsApp (+91 93981 13504).
- **Candidate Command Sabha:** Recruiter review dashboard at `/admin/applications` with real-time candidate search, status filters, and one-click WhatsApp chat.

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router, Turbopack) & React 19
- **3D & Visuals:** Three.js, `@react-three/fiber`, `@react-three/drei`, Canvas WebGL
- **Styling:** Vanilla CSS, Tailwind CSS, bespoke Cinzel & Medieval typography
- **Database & Backend:** Firebase Cloud Firestore & Node.js API routes
- **Communication:** WhatsApp Web / Native protocol + Nodemailer & Resend engine

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/abhi-vasireddy/Legends-of-Treta.git
cd Legends-of-Treta
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env.local` and configure your keys:
```bash
cp .env.example .env.local
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the realm.

---

## 📜 Key Routes

- `/` — Interactive Kasane scroll and 3D Ramayana temple showcase
- `/careers` — Treta Yuga studio roles and job listings
- `/admin/applications` — Recruiter Command Sabha & candidate review dashboard
- `/api/applications/firebase` — Cloud Firestore submission & WhatsApp payload generator

---

## 🛡 License

Private repository © Herinova Game Studios. All rights reserved.
