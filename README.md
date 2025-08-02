# 🎯 MapperSync: A Fully Functional, Responsive World Mapping Web App

[⭐ Star on GitHub](https://github.com/SoumyaSagarNayak/ForIBM)

---

## 📌 Project Goal

Build **MapperSync**, a sleek interactive educational website using only **HTML**, **CSS**, and **vanilla JavaScript**.  
No frameworks, no libraries—just pure web magic. Dive from continents to countries to states, explore cities, trivia, and more.

---

## 🧩 Core Features

- **🌍 Interactive Globe Section**  
  CSS/JS-based rotating Earth or SVG globe. Continents glow on hover/click and lead into continent views.

- **🗺️ Continent → Country → State Navigation**  
  Drill down: select a continent → list of countries → select a country → list of states → select a state → view map with:
    - Major city pins 📍  
    - Hoverable labels with fun facts

---

## 🎨 UI / UX Essentials

- **Clean, nature‑inspired palette**: sky‑blue, forest green, ocean teal, sand beige, soft brown  
- **Light/Dark Mode Toggle**: smooth transitions, store preference in `localStorage`  
- **Fully Responsive**: using Flexbox/Grid + media queries  

🧭 UX extras:
- Sticky nav on scroll  
- Hover & transition effects  
- Collapsible nav for mobiles  
- Smooth page scrolling  
- Animated state transitions (continent → country → state)

---

## 🧑‍🎨 Navigation Bar

Sticky and responsive bar with:
- Home | Continent Explorer | State Maps | Creator Profile | Contact  
- Simulated user count badge (via JavaScript)  
- Dark/light toggle  
- Dropdown jump to continents/countries

---

## 🗂 Creator Profile Section

Card-style layout (responsive):
- Profile image  
- Name: Soumya Sagar Nayak  
- Short bio + social links

---

## 🌍 Map Display Section

For each continent, country, and state:
- Title heading  
- Map (SVG or styled divs)  
- 3–5 pins marking key locations  
- Mini description/trivia per pin

---

## 📝 Bonus: Profile Form (JS‑only)

Allow visitors to create their own map profile:
- Inputs: Name, favorite continent/country/state, map type  
- Displays submitted profile card dynamically  
- Increments user count on submit or refresh

---

## ⚙️ Tech Stack (Strictly)

- HTML5 (semantic tags)  
- CSS3 (Grid, Flexbox, animations/transitions)  
- Vanilla JS (DOM events, localStorage, UI interactivity)  

_No React, no jQuery, no APIs, no external frameworks._

---

## 📦 Simulated Data & Storage

- Static JS objects/arrays for continents → countries → states → cities  
- Simulated profiles and user count using JS + `localStorage`  
- Optional features:
  - LocalStorage persistence (dark mode, user profile)
  - Random fact generator (JS array + randomizer)
  - Mini carousel (country/state preview images)

---

## ⚡ Optional Bonuses

- Save preferences in `localStorage`  
- "Random Country/Fact of the Day" feature  
- Mini‑map carousel of different regions

---

## 📁 Assets

- Globe / Earth animation (SVG or CSS)  
- Placeholder or SVG maps for continents/countries/states  
- Icons: pins, arrows, map markers  

---


<pre>
📁 MapperSync/
├── 📁 assets/           # Images, icons, SVGs  
├── 📁 css/              # All stylesheets  
│   └── styles.css  
├── 📁 js/               # Script files  
│   └── main.js  
├── index.html           # Main entry point  
└── README.md            # Project documentation  
</pre>
---

## 🚀 Getting Started

 Clone the repo:  
   ```bash
   git clone https://github.com/SoumyaSagarNayak/MapperSync.git
   ```
