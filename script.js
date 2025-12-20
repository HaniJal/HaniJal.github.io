const PROJECTS = [
  {
    id: "invaders",
    title: "Space Invaders",
    desc: "Arcade game with movement, collision logic, and game state management.",
    tags: ["JavaScript", "HTML", "CSS", "SVG"],
    code: "https://github.com/HaniJal/Space-Invaders",
    image: "assets/invaders.png"
  },
  {
    id: "weather",
    title: "Weather App",
    desc: "Weather lookup UI with API integration, input validation, and responsive layout.",
    tags: ["JavaScript", "API", "HTML", "CSS"],
    code: "https://github.com/HaniJal/WeatherApp",
    image: "assets/weather.png"
  },
  {
  id: "gameoflife",
  title: "Conway’s Game of Life",
  desc: "Java implementation of Conway’s Game of Life with grid simulation, neighbor counting, and step-by-step evolution.",
  tags: ["Java", "OOP"],
  code: "https://github.com/HaniJal/Game-Of-Life",
  image: "assets/gameoflife.png"
  },
  {
    id: "paint",
    title: "Paint App",
    desc: "Drawing application focusing on UI events and OOP structure.",
    tags: ["Java", "JavaFX", "OOP"],
    code: "https://github.com/HaniJal/PaintApp",
    image: "assets/paint.png"
  },
  {
    id: "doctorwho",
    title: "Doctors Database",
    desc: "Database-backed C# project. Focus on structure, validation, and clean workflows.",
    tags: ["C#", "SQL", ".NET"],
    code: "https://github.com/HaniJal/Doctors-Database",
    image: "assets/doctorwho.png"
  },
  {
    id: "village",
    title: "Village Project",
    desc: "Text simulation demonstrating OOP design: abstraction, polymorphism, and interfaces.",
    tags: ["Java", "OOP"],
    code: "https://github.com/HaniJal/Village-Project",
    image: "assets/village.png"
  }
];


const SKILLS = [
  "Java", "JavaScript", "C#", "SQL", "PHP",
  "HTML", "CSS", "Bootstrap", "SVG",
  "Git/GitHub", "OOP"
];

// ===== THEME =====
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

function forceDark() {
  root.setAttribute("data-theme", "dark");
  if (themeBtn) themeBtn.textContent = "🌙";
  localStorage.removeItem("theme");
}

forceDark();
window.addEventListener("pageshow", () => {
  forceDark();
});

// Toggle 
themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  themeBtn.textContent = next === "light" ? "☀️" : "🌙";
});

// ===== YEAR =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== NAV hide on scroll down =====
const nav = document.querySelector(".nav");
let lastY = window.scrollY;

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  if (y < 40){
    nav.classList.remove("navHidden");
    lastY = y;
    return;
  }

  if (y > lastY) nav.classList.add("navHidden");
  else nav.classList.remove("navHidden");

  lastY = y;
}, { passive: true });

// ===== FILTERS + GRID =====
const filtersEl = document.getElementById("filters");
const gridEl = document.getElementById("grid");

function uniqTags() {
  const set = new Set();
  PROJECTS.forEach(p => p.tags.forEach(t => set.add(t)));
  return ["All", ...Array.from(set)];
}

let active = "All";

function renderFilters() {
  filtersEl.innerHTML = "";
  uniqTags().forEach(t => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "filter" + (t === active ? " active" : "");
    b.textContent = t;
    b.addEventListener("click", () => {
      active = t;
      renderFilters();
      renderProjects();
    });
    filtersEl.appendChild(b);
  });
}

function githubIconSVG() {
  return `
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.51 0 12.31c0 5.44 3.44 10.05 8.21 11.68.6.11.82-.26.82-.58v-2.2c-3.34.74-4.03-1.44-4.03-1.44-.54-1.41-1.33-1.78-1.33-1.78-1.09-.76.08-.74.08-.74 1.2.09 1.84 1.26 1.84 1.26 1.07 1.87 2.81 1.33 3.49 1.02.11-.8.42-1.34.76-1.65-2.67-.31-5.47-1.36-5.47-6.05 0-1.34.47-2.44 1.24-3.3-.12-.31-.54-1.56.12-3.24 0 0 1.01-.33 3.3 1.26.96-.27 1.99-.41 3.01-.41 1.02 0 2.05.14 3.01.41 2.29-1.59 3.3-1.26 3.3-1.26.66 1.68.24 2.93.12 3.24.77.86 1.24 1.96 1.24 3.3 0 4.7-2.81 5.74-5.49 6.05.43.39.82 1.14.82 2.3v3.42c0 .32.22.7.82.58C20.57 22.36 24 17.75 24 12.31 24 5.51 18.63 0 12 0z"/>
    </svg>
  `;
}

function projectCard(p) {
  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join("");

  const img = p.image
    ? `<img src="${p.image}" alt="${p.title} preview" loading="lazy" onerror="this.remove();">`
    : "";

  return `
    <article class="project" id="proj-${p.id}">
      <div class="thumb">${img}</div>

      <div class="pTopRow">
        <div class="pTitle">${p.title}</div>

        <a class="githubIconLink" href="${p.code}" target="_blank" rel="noreferrer"
           aria-label="Open GitHub repository for ${p.title}">
          ${githubIconSVG()}
        </a>
      </div>

      <p class="pDesc">${p.desc}</p>
      <div class="tags">${tags}</div>
    </article>
  `;
}


function renderProjects() {
  const list = active === "All" ? PROJECTS : PROJECTS.filter(p => p.tags.includes(active));
  gridEl.innerHTML = list.map(projectCard).join("");
}

renderFilters();
renderProjects();


