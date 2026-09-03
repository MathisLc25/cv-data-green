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
    title: "Dictionnaire en C",
    desc: "Conception d'un dictionnaire bilingue optimisé avec gestion rigoureuse de la mémoire dynamique.",
    tech: "Langage C, Algorithmique",
    github: "https://github.com/MathisLc25/Projet-C-"
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
    title: "Gestion Commerciale & SQL",
    desc: "Modélisation MCD/MLD et implémentation d'une base de données SQL pour flux commerciaux.",
    tech: "SQL, MySQL",
    github: "#"
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

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12 md:px-16 max-w-6xl mx-auto">
      {/* En-tête / Header avec lien GitHub direct pour les RH */}
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-8 mb-12 gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
            Mathis Ladine Caloc
          </h1>
          <p className="text-emerald-400 font-medium text-base md:text-lg">
            Data & Artificial Intelligence • ECE Bordeaux
          </p>
          <p className="text-slate-400 text-sm mt-1">
            À la recherche d'une alternance en Data / IA à partir de Septembre 2026.
          </p>
        </div>

        {/* Boutons d'accès rapide Pro & RH */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/MathisLc25"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500 hover:text-white transition-all text-xs font-semibold text-slate-300 shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Mon GitHub ↗
          </a>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
          >
            Télécharger mon CV 📄
          </a>
        </div>
      </header>

      {/* Section des Projets */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Projets & Réalisations</h2>
          <p className="text-slate-400 text-sm mt-1">
            Découvrez mes projets en Data, IA, ingénierie logicielle et analyse de performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div 
              key={project.title} 
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/20 hover:border-slate-700 hover:bg-slate-900/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
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
                  {project.tech.split(", ").map((t) => (
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
                      className={`${project.demo ? "flex-1" : "w-full"} text-center py-2.5 px-4 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700/60 flex items-center justify-center gap-1.5`}
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