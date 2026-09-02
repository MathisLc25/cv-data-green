"use client";

import { useState } from "react";

type ProjectCategory = "Tous" | "Data & IA" | "Aéronautique & F1" | "Systèmes & C" | "Fullstack & SQL";

interface Project {
  title: string;
  category: "Data & IA" | "Aéronautique & F1" | "Systèmes & C" | "Fullstack & SQL";
  desc: string;
  metric?: string;
  tech: string[];
  github: string;
  demo?: string;
}

const projects: Project[] = [
  // --- TES PROJETS EXISTANTS & CLÉS ---
  {
    title: "F1 Performance App",
    category: "Aéronautique & F1",
    metric: "Clustering ML & FastF1",
    desc: "Dashboard d'analyse télémétrique et de coaching IA pour monoplaces de course. Comparaison tour par tour et analyse des zones de freinage.",
    tech: ["Python", "Streamlit", "FastF1", "Scikit-learn", "Plotly"],
    github: "https://github.com/MathisLc25/F1_Performance_App",
    demo: "https://share.streamlit.io"
  },
  {
    title: "OLM Dashboard",
    category: "Fullstack & SQL",
    metric: "Architecture API REST",
    desc: "Application de gestion d'actifs et de trésorerie pour freelances avec modélisation relationnelle complète et reporting graphique dynamique.",
    tech: ["FastAPI", "SQLModel", "PostgreSQL", "React", "Chart.js"],
    github: "https://github.com/MathisLc25/OLM-Dashboard",
    demo: "https://olm-dashboard.vercel.app"
  },
  {
    title: "AI Customer Platform",
    category: "Data & IA",
    metric: "LLM temps réel",
    desc: "Plateforme d'automatisation relation client orientée secteur bancaire, intégrant Llama 3 via Groq API et notifications webhook.",
    tech: ["Python", "Streamlit", "Llama 3", "Groq API", "Webhooks"],
    github: "https://github.com/MathisLc25/AI-customer",
    demo: "https://ai-customer.streamlit.app"
  },
  {
    title: "Eco-Track F1 v2",
    category: "Aéronautique & F1",
    metric: "Calcul d'empreinte carbone",
    desc: "Application web estimant l'empreinte CO2 des vols et acheminements logistiques sur l'ensemble des circuits du calendrier mondial.",
    tech: ["Next.js", "React", "Tailwind CSS", "Data Viz"],
    github: "https://github.com/MathisLc25/eco-track-f1-v2",
    demo: "https://eco-track-f1.vercel.app"
  },
  {
    title: "Analyse Usure & Télémétrie F1",
    category: "Data & IA",
    metric: "Data Pipeline Pandas",
    desc: "Modélisation statistique de la dégradation des gommes et calcul des stratégies optimales de pit-stop à partir de données historiques.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    github: "https://github.com/MathisLc25/f1-tire-analysis"
  },

  // --- NOUVEAUX PROJETS STRATÉGIQUES (EMBARQUÉ, BANCAIRE C, SQL) ---
  {
    title: "Fast Banking Indexer (C)",
    category: "Systèmes & C",
    metric: "< 150 ms / 1M lignes",
    desc: "Moteur d'indexation haute performance de flux financiers (logs de transactions). Utilisation de memory mapping (mmap) et hashmap custom. 0 fuite Valgrind.",
    tech: ["Langage C", "Linux I/O", "mmap", "Valgrind", "Makefile"],
    github: "https://github.com/MathisLc25/Projet-C-"
  },
  {
    title: "Moniteur Télémétrie Embarqué",
    category: "Systèmes & C",
    metric: "Flux temps réel 100 Hz",
    desc: "Acquisition et traitement de flux capteurs (vibrations, température) simulant un bus CAN aéronautique ou automobile avec détection de seuils critiques.",
    tech: ["C / C++", "FreeRTOS", "Bus CAN / UART", "IoT"],
    github: "https://github.com/MathisLc25"
  },
  {
    title: "Aero ADS-B Flight Tracker",
    category: "Aéronautique & F1",
    metric: "Données spatiales temps réel",
    desc: "Visualiseur de routes aériennes et logs radar avec calculs des profils d'altitude, de dérive et estimation de consommation carburant.",
    tech: ["Python", "Mapbox / Leaflet", "GeoPandas", "Aéronautique"],
    github: "https://github.com/MathisLc25"
  },
  {
    title: "Data Warehouse & Requêtes Avancées",
    category: "Fullstack & SQL",
    metric: "Schéma en étoile (3NF)",
    desc: "Modélisation MCD/MLD d'une architecture de données bancaires & retail. Requêtes analytiques complexes (Window Functions, CTE, Indexation).",
    tech: ["PostgreSQL", "MySQL", "Database Design", "Optimisation SQL"],
    github: "https://github.com/MathisLc25"
  }
];

const categories: ProjectCategory[] = [
  "Tous",
  "Data & IA",
  "Aéronautique & F1",
  "Systèmes & C",
  "Fullstack & SQL"
];

export default function ProjectSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Tous");

  const filteredProjects = activeCategory === "Tous" 
    ? projects 
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full space-y-8">
      {/* Filtres par domaine */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille des projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.title}
            className="group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-800/80 bg-slate-900/30 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-slate-900/60 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-emerald-500/5"
          >
            <div>
              {/* Entête de carte : Titre + Métrique */}
              <div className="flex justify-between items-start gap-4 mb-3">
                <div>
                  <span className="text-[11px] font-medium tracking-wider text-emerald-400/90 uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mt-0.5">
                    {project.title}
                  </h3>
                </div>

                {project.metric && (
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-emerald-950/40 text-emerald-300 border border-emerald-500/20 whitespace-nowrap">
                    {project.metric}
                  </span>
                )}
              </div>

              {/* Description synthétique pensée pour les RH */}
              <p className="text-slate-300 text-sm mb-5 leading-relaxed font-normal">
                {project.desc}
              </p>

              {/* Badges Technos */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/40 text-slate-300 text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Barre d'action : Démo RH + GitHub */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/10"
                >
                  Tester la démo ↗
                </a>
              )}

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-700 transition-all ${
                  !project.demo ? "w-full" : ""
                }`}
              >
                Code GitHub ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}