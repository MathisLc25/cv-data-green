"use client";

import { useState } from "react";

const CATEGORIES = [
  "Tous",
  "Aéronautique & F1",
  "Data & IA",
  "Systèmes & Backend",
  "Logiciel & Web",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Project {
  title: string;
  category: "Aéronautique & F1" | "Data & IA" | "Systèmes & Backend" | "Logiciel & Web";
  badge?: string;
  desc: string;
  tech: string;
  demo?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Aero ADS-B Flight Tracker",
    category: "Aéronautique & F1",
    badge: "Données spatiales temps réel",
    desc: "Visualiseur de routes aériennes et logs radar avec calculs des profils d'altitude, de dérive et estimation de consommation carburant.",
    tech: "Python, Streamlit, Folium, Plotly, Aéronautique",
    demo: "https://aero-flight-tracker.streamlit.app",
    github: "https://github.com/MathisLc25/aero-flight-tracker",
  },
  {
    title: "F1 Performance App",
    category: "Aéronautique & F1",
    badge: "Clustering ML & FastF1",
    desc: "Dashboard d'analyse télémétrique et de coaching IA pour monoplaces de course. Comparaison tour par tour et analyse des zones de freinage.",
    tech: "Python, Streamlit, FastF1, Scikit-learn, Plotly",
    demo: "https://f1performance.streamlit.app",
    github: "https://github.com/MathisLc25/F1_Performance_App",
  },
  {
    title: "Eco-Track F1 v2",
    category: "Aéronautique & F1",
    badge: "Calcul d'empreinte carbone",
    desc: "Application web estimant l'empreinte CO2 des vols et acheminements logistiques sur l'ensemble des circuits du calendrier mondial.",
    tech: "Next.js, React, Tailwind CSS, Data Viz",
    demo: "https://eco-track-f1.vercel.app",
    github: "https://github.com/MathisLc25/eco-track-f1-v2",
  },
  {
    title: "Analyse Data Pneu F1",
    category: "Aéronautique & F1",
    badge: "Régression polynomiale",
    desc: "Analyse télémétrique FIA et modélisation de dégradation pneumatique par régression pour anticiper les stratégies de course.",
    tech: "Python, Streamlit, FastF1, Scikit-Learn, Matplotlib",
    demo: "https://f1-tire-analysis.streamlit.app",
    github: "https://github.com/MathisLc25/f1-tire-analysis",
  },
  {
    title: "Enterprise AI & Data Automation Hub",
    category: "Data & IA",
    badge: "Llama 3.1 & Analytics",
    desc: "Plateforme de traitement par lot et temps réel des flux clients : classification Llama 3.1 via Groq, escalade automatique par webhook et dashboard d'audit.",
    tech: "Python, Streamlit, Groq API, Pandas, Plotly",
    demo: "https://ai-customer.streamlit.app",
    github: "https://github.com/MathisLc25/AI-customer",
  },
  {
    title: "Moteur d'audit de transactions bancaires",
    category: "Systèmes & Backend",
    badge: "Haute Performance (~1.4M tx/s)",
    desc: "Moteur haute performance en C99 analysant 1 000 000 de transactions bancaires en 714 ms. Contrôle de conformité AML, agrégats de volume et alertes de fraude.",
    tech: "C99, GCC O3, AML Compliance, Benchmarking",
    github: "https://github.com/MathisLc25/bank-log-engine",
  },
  {
    title: "Gestion Commerciale & SQL",
    category: "Systèmes & Backend",
    badge: "Modélisation Relationnelle",
    desc: "Conception MCD/MLD normalisée et implémentation d'une base de données SQL optimisée pour la gestion de stocks et flux commerciaux.",
    tech: "SQL, MySQL, Modélisation MCD/MLD",
    github: "https://github.com/MathisLc25",
  },
  {
    title: "Dictionnaire en C",
    category: "Systèmes & Backend",
    badge: "Algorithmique & Pointeurs",
    desc: "Conception d'un dictionnaire bilingue optimisé en mémoire avec gestion rigoureuse des allocations dynamiques et arbres binaires.",
    tech: "Langage C, Structures de données, Valgrind",
    github: "https://github.com/MathisLc25/Projet-C-",
  },
  {
    title: "OLM (Asset Management)",
    category: "Logiciel & Web",
    badge: "POC FinTech Étudiant",
    desc: "Proof of Concept pour un système de gestion financière et budgétaire spécialement adapté aux étudiants, développé suite à un test technique chez JEECE.",
    tech: "Java, Spring Boot, React, Architecture Logicielle",
    github: "https://github.com/MathisLc25/JEECE-LedgerOne-Test-Technique",
  },
];

const skills = [
  { label: "Data Science & IA", pct: 35, color: "#22c55e" }, // Vert vif
  { label: "Aéronautique & Télémétrie F1", pct: 25, color: "#16a34a" }, // Vert émeraude
  { label: "Développement Web & Logiciel", pct: 25, color: "#15803d" }, // Vert moyen
  { label: "Systèmes C99, Algorithmique & SQL", pct: 15, color: "#27272a" }, // Gris zinc sombre
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Tous");

  const filteredProjects =
    selectedCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-12 md:px-16 max-w-6xl mx-auto selection:bg-green-500 selection:text-black">
      {/* En-tête */}
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-8 mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Mathis Ladine Caloc
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-semibold bg-green-950/70 text-green-400 border border-green-500/40 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.2)]">
              Alternance Sept. 2026
            </span>
          </div>
          <p className="text-green-400 font-medium text-base md:text-lg">
            Data & Artificial Intelligence • ECE Bordeaux
          </p>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Futur ingénieur orienté Data, Intelligence Artificielle et modélisation télémétrique haute performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/MathisLc25"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-green-500 hover:text-white transition-all text-xs font-semibold text-zinc-300 hover:shadow-[0_0_12px_rgba(34,197,94,0.2)]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub ↗
          </a>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-green-500 hover:bg-green-400 text-black font-bold text-xs transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
          >
            Télécharger CV 📄
          </a>
        </div>
      </header>

      {/* Graphique en Camembert (Donut Chart) des Compétences */}
      <section className="mb-14 p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800">
        <div className="mb-6">
          <h3 className="text-sm uppercase tracking-wider text-green-400 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Répartition des Compétences & Spécialisations
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Focus technique et temps alloué au développement de projets
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
          {/* Camembert SVG Donut */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Cercle d'arrière-plan */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#18181b"
                strokeWidth="16"
              />
              {/* Part 1 : Data & IA (35%) -> strokeDasharray="87.96 251.32" */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#22c55e"
                strokeWidth="16"
                strokeDasharray="88 251.32"
                strokeDashoffset="0"
                className="transition-all duration-500"
              />
              {/* Part 2 : Aéro & F1 (25%) -> offset -88 */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#16a34a"
                strokeWidth="16"
                strokeDasharray="63 251.32"
                strokeDashoffset="-88"
                className="transition-all duration-500"
              />
              {/* Part 3 : Web & Logiciel (25%) -> offset -151 */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#15803d"
                strokeWidth="16"
                strokeDasharray="63 251.32"
                strokeDashoffset="-151"
                className="transition-all duration-500"
              />
              {/* Part 4 : C99 & SQL (15%) -> offset -214 */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#3f3f46"
                strokeWidth="16"
                strokeDasharray="38 251.32"
                strokeDashoffset="-214"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-white font-mono">100%</span>
              <span className="text-[10px] uppercase text-zinc-400 font-semibold tracking-wider">
                Tech Focus
              </span>
            </div>
          </div>

          {/* Légende du camembert */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
            {skills.map((skill) => (
              <div
                key={skill.label}
                className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between gap-4 min-w-[240px]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  ></span>
                  <span className="text-xs font-medium text-zinc-200">{skill.label}</span>
                </div>
                <span className="text-xs font-mono font-bold text-green-400">
                  {skill.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section des Projets avec Onglets */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Projets & Réalisations
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Filtrez par domaine technique pour tester les démos en direct ou explorer le code source.
            </p>
          </div>

          {/* Onglets de filtrage */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    active
                      ? "bg-green-500 text-black border-green-400 shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grille des cartes projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.12)] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[11px] font-bold text-green-400 tracking-wider uppercase">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-green-950/60 text-green-400 border border-green-500/30 font-medium">
                      {project.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-zinc-400 text-sm mb-6 font-normal leading-relaxed">
                  {project.desc}
                </p>
              </div>

              <div>
                {/* Badges technologiques */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.split(", ").map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Boutons d'actions adaptatifs */}
                <div className="flex items-center gap-3 pt-2 border-t border-zinc-900">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 px-4 text-xs font-bold rounded-lg bg-green-500 hover:bg-green-400 text-black transition-all flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                    >
                      Tester la démo ↗
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        project.demo ? "flex-1" : "w-full"
                      } text-center py-2.5 px-4 text-xs font-semibold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white transition-colors border border-zinc-800 flex items-center justify-center gap-1.5`}
                    >
                      Code GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}