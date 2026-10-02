# ✦ FitVerse — Mental & Physical Wellness Ecosystem

> **A holistic, production-grade Mental + Physical Health & Wellness Platform powered by Spring Boot 3, Java 21, React 18, and Web Speech AI.**

---

## 🌟 Overview & Key Architecture

FitVerse integrates mental wellness, physical training, macro nutrition, and predictive biometric analytics into a unified web application with separate service domains.

`
┌─────────────────┬────────────────────────────────────────────────────────────────────────────┐
│ ✦ FITVERSE      │ 🔍 Search Fitverse...                   ☀️ Day Mode  🔔  [Avatar] Hi, User │
├─────────────────┼────────────────────────────────────────────────────────────────────────────┤
│ 🏠 Dashboard    │ Good Morning 🌟                                                           │
│ 🧠 Mental       │ Let's continue your journey to a better you!                               │
│ ⚡ Physical     ├──────────────┬──────────────┬──────────────┬──────────────┬──────────────┤
│ 🥗 Nutrition    │ Fitverse     │ Mental       │ Physical     │ Streak       │ Talk to      │
│ 📊 Analytics    │ Score (Dial) │ Wellness     │ Fitness      │ 🔥 14 days   │ Fitverse     │
│ 🤖 AI Coach New │ 82 / 100     │ 78 / 100     │ 86 / 100     │ On fire!     │ AI Voice     │
│ 🏆 Challenges   ├──────────────┴──────────────┼──────────────┴──────────────┤ Soundwaves   │
│ 👥 Community    │ Today's Plan                │ Weekly Progress              │ 🎙️ Speak     │
│ 🛍️ Shop         │ [All][Mental][Workout][Nut] │ Workouts: 80% (Purple)       ├──────────────┤
│ 📅 Calendar     │ • 7:00 AM Meditation (✓)    │ Nutrition: 85% (Green)       │ Recent       │
│ 💬 Messages     │ • 9:00 AM Workout           │ Meditation: 60% (Blue)       │ Insights     │
│ ⚙️ Settings     │ • 1:00 PM High Protein      │ Sleep: 70% (Orange)          │ Stress high  │
│                 │ • 9:30 PM Gratitude Journal ├──────────────────────────────┤ Consistency  │
│ [🎙️ Voice]      │                             │ Mind & Body Insights (🧘‍♀️)   │ Protein low  │
│ Talk to Fitverse│                             │ Sleep better on workout days ├──────────────┤
│ Tap to speak    │                             │ Less stress on meditation    │ Quick Actions│
│                 ├─────────────────────────────┴──────────────────────────────┤ [😊][🏋️][🥗][🌙]│
│                 │ 🧬 3D Human Muscle Anatomy Explorer                        │ Log buttons  │
│                 │ [ Front / Back ] [ 360° Spin ] [ Superficial / Deep ]       │              │
└─────────────────┴────────────────────────────────────────────────────────────────────────────┘
`

---

## 🚀 Key Modules & Features

### 1. 🧠 Mental Wellness Sanctuary (/mental)
- **Non-Diagnostic Assessment**: Real-time evaluation across mood, stress, sleep, and relaxation scores.
- **4-4-4-4 Box Breathing Engine**: Animated visual box breathing timer with guided inhale/hold/exhale phases.
- **Private Gratitude Journal**: Encrypted reflections and emotional state tracking.
- **Stress & Mood Logger**: Categorized triggers and emotional metrics.

### 2. 💪 Physical Fitness Arena (/physical)
- **🧬 3D Human Muscle Anatomy Explorer**: Interactive 3D vector model with 360° auto-spin, superficial vs deep muscle layers, Latin names, and target compound exercise mappings.
- **Biometric Composition Engine**: Mifflin-St Jeor BMR & TDEE calculators, BMI, and Deurenberg body fat estimations.
- **Exercise Catalog & Muscle Target Index**: Comprehensive database of compound lifts and isolation movements.
- **Workout Logger**: Progressive overload tracking with sets, reps, weight, and RPE scores.
- **Student Budget Diet Planner**: High-yield Indian diet optimization (Protein per Rupee ₹).

### 3. 🥗 Nutrition & Macro Engine (/nutrition)
- Daily caloric intake vs macro expenditure (Carbs, Fats, Protein).
- Multi-meal logger (Breakfast, Lunch, Dinner, Snacks).
- Real-time macro progress bars.

### 4. 📊 Holistic Analytics & Fitverse Score (/analytics)
- Dynamic 5-pillar composite index:
  \text{Fitverse Score} = 0.20 \cdot M + 0.25 \cdot P + 0.20 \cdot S + 0.20 \cdot N + 0.15 \cdot C
- 7-day trend arrays and algorithmic cross-domain insights.

### 5. 🎙️ "Talk to Fitverse" Real-Time Voice Assistant
- Interactive speech-to-speech assistant powered by Web Speech API.
- Animated soundwave visualization and structured voice action triggers (LOG_MOOD, LOG_WORKOUT, LOG_FOOD, BREATHING_TIMER).

### 6. 🎨 Obsidian Dark & Day Light Mode Theme
- Instant toggle (☀️ Day Mode / 🌙 Night Mode) in top navigation bar.
- Saved user preferences with localStorage persistence.
- Fixed full-height sidebar that never scrolls away.

---

## 🛠️ Tech Stack

### Backend
- **Java 21 LTS**
- **Spring Boot 3.3.4** (Spring MVC, Spring Data JPA, Spring Security)
- **JWT (JSON Web Token)** Authentication & RBAC (ROLE_USER, ROLE_TRAINER, ROLE_ADMIN)
- **MySQL 8.0** database with Hibernate ORM
- **Lombok**, **Jackson JavaTimeModule**

### Frontend
- **React 18**
- **Vite 5**
- **Tailwind CSS** (Custom Obsidian Theme)
- **Lucide React Icons**
- **Recharts** (Interactive trend analytics)
- **Web Speech API** (Speech Recognition & Speech Synthesis)

---

## ⚡ Quick Start

### 1. Prerequisites
- Java 21 JDK
- Node.js 18+ & npm
- MySQL 8.0 (create database itverse_db)

### 2. Backend Setup
`ash
cd backend
# Run Spring Boot backend on port 8080
./mvnw spring-boot:run
`

### 3. Frontend Setup
`ash
cd frontend
# Install dependencies
npm install

# Start Vite dev server on port 5173
npm run dev
`

### 4. Default Seed Accounts
- **User**: user@fitverse.com / User@12345
- **Trainer**: 	rainer@fitverse.com / Trainer@12345
- **Admin**: dmin@fitverse.com / Admin@12345

---

## 📄 License
This project is licensed under the MIT License.
