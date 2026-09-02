"use client";

const projects = [
  {
    title: "Analyse Data Pneu F1",
    desc: "Analyse télémétrique FIA et modélisation de dégradation pneumatique par régression polynomiale.",
    tech: "Python, FastF1, Scikit-Learn, Matplotlib",
    github: "https://github.com/MathisLc25/f1-tire-analysis"
  },
  {
    title: "OLM (POC)",
    desc: "Développement d'un Proof of Concept pour un système de gestion financière sécurisé.",
    tech: "Java, JEE, Architecture Logicielle",
    github: "https://github.com/MathisLc25/JEECE-LedgerOne-Test-Technique"
  },
  
  {
    title: "Eco-Track F1 v2",
    category: "AÉRONAUTIQUE & F1",
    badge: "Calcul d'empreinte carbone",
    desc: "Application web estimant l'empreinte CO2 des vols et acheminements logistiques sur l'ensemble des circuits du calendrier mondial.",
    tech: "Next.js, React, Tailwind CSS, Data Viz",
    demo: "https://eco-track-f1.vercel.app",
    github: "https://github.com/MathisLc25/eco-track-f1-v2"
  },

  {
    title: "F1 Performance App",
    category: "AÉRONAUTIQUE & F1",
    badge: "Clustering ML & FastF1",
    desc: "Dashboard d'analyse télémétrique et de coaching IA pour monoplaces de course. Comparaison tour par tour et analyse des zones de freinage.",
    tech: "Python, Streamlit, FastF1, Scikit-learn, Plotly",
    demo: "https://f1performance.streamlit.app",
    github: "https://github.com/MathisLc25/F1_Performance_App"
  },
  {
    title: "Enterprise AI & Data Automation Hub",
    desc: "Plateforme de traitement par lot et temps réel des flux clients : classification Llama 3.1, escalade automatique par webhook et dashboard d'audit.",
    tech: "Python, Streamlit, Groq API, Pandas, Plotly",
    github: "https://github.com/MathisLc25/AI-customer"
  },
  {
    title: "Moteur d'audit de transactions bancaires",
    desc: "Moteur haute performance en C99 analysant 1 000 000 de transactions bancaires en 714 ms (~1,4M tx/s). Contrôle de conformité, calcul d'agrégats de volume et détection d'alertes de fraude en temps réel.",
    tech: "C99, GCC O3, AML Compliance, Benchmarking",
    github: "https://github.com/MathisLc25/bank-log-engine"
  },
  {
    title: "Aero ADS-B Flight Tracker",
    category: "AÉRONAUTIQUE & F1",
    badge: "Données spatiales temps réel",
    desc: "Visualiseur de routes aériennes et logs radar avec calculs des profils d'altitude, de dérive et estimation de consommation carburant.",
    tech: "Python, Streamlit, Folium, Plotly, Aéronautique",
    demo: "https://aero-flight-tracker.streamlit.app",
    github: "https://github.com/MathisLc25/aero-flight-tracker"
  }
];

export default function ProjectSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div 
          key={project.title} 
          className="p-6 rounded-2xl border border-slate-800 bg-slate-900/20 hover:border-slate-700 hover:bg-slate-900/40 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            {/* Header de la carte avec catégorie et badge si présents */}
            {(project.category || project.badge) && (
              <div className="flex justify-between items-center mb-2">
                {project.category && (
                  <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                    {project.category}
                  </span>
                )}
                {project.badge && (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-medium">
                    {project.badge}
                  </span>
                )}
              </div>
            )}

            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
              {project.title}
            </h3>

            <p className="text-slate-400 text-sm mb-6 font-normal leading-relaxed">
              {project.desc}
            </p>
          </div>

          <div>
            {/* Badges technologiques */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(Array.isArray(project.tech) ? project.tech : project.tech.split(", ")).map((t) => (
                <span 
                  key={t} 
                  className="text-xs px-2.5 py-1 rounded-md bg-slate-800/70 text-slate-300 border border-slate-700/50"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Boutons d'actions : Démo et/ou GitHub */}
            <div className="flex items-center gap-3 pt-2">
              {project.demo && (
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 px-4 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  Tester la démo ↗
                </a>
              )}

              {project.github && project.github !== "#" && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 px-4 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700/60 flex items-center justify-center gap-1.5"
                >
                  Code GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}