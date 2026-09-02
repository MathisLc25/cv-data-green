"use client";

const projects = [
  {
    title: "Analyse Data Pneu F1",
    desc: "Analyse télémétrique FIA et modélisation de dégradation pneumatique par régression polynomiale.",
    tech: "Python, FastF1, Scikit-Learn, Matplotlib",
    link: "https://github.com/MathisLc25/f1-tire-analysis"
  },
  {
    title: "OLM (POC)",
    desc: "Développement d'un Proof of Concept pour un système de gestion financière sécurisé.",
    tech: "Java, JEE, Architecture Logicielle",
    link: "https://github.com/MathisLc25/JEECE-LedgerOne-Test-Technique"
  },
  {
    title: "Dictionnaire en C",
    desc: "Conception d'un dictionnaire bilingue optimisé avec gestion rigoureuse de la mémoire dynamique.",
    tech: "Langage C, Algorithmique",
    link: "https://github.com/MathisLc25/Projet-C-"
  },
  {
    title: "Eco track f1",
    desc: "Calculateur d'empreinte carbone pour les déplacements en Grand Prix depuis Bordeaux, conçu selon les normes d'accessibilité WCAG et prêt pour le pilotage analytics."",
    tech: "Next.js, React, Tailwind CSS, TypeScript",
    link: "https://github.com/MathisLc25/eco-track-f1-v2"
  },
   {
    title: "Gestion Commerciale & SQL",
    desc: "Modélisation MCD/MLD et implémentation d'une base de données SQL pour flux commerciaux.",
    tech: "SQL, MySQL",
    link: "#"
  },
   {
    title: "Pitwall F1 et Télémétrie & IA",
    desc: "Application d'ingénierie de piste et analyse de télémétrie F1 avec segmentation non-supervisée par K-Means.",
    tech: "Python, Streamlit, Scikit-Learn, FastF1, Plotly",
    link: "https://github.com/MathisLc25/F1_Performance_App"
  },
  {
    title: "Enterprise AI & Data Automation Hub",
    desc: "Plateforme de traitement par lot et temps réel des flux clients : classification Llama 3.1, escalade automatique par webhook et dashboard d'audit.",
    tech: "Python, Streamlit, Groq API, Pandas, Plotly",
    link: "https://github.com/MathisLc25/AI-customer"
  },
  {
    title: "Moteur d'audit de transactions bancaires",
    desc: "Moteur haute performance en C99 analysant 1 000 000 de transactions bancaires en 714 ms (~1,4M tx/s). Contrôle de conformité, calcul d'agrégats de volume et détection d'alertes de fraude en temps réel.",
    tech: "C99, GCC O3, AML Compliance, Benchmarking",
    link: "https://github.com/MathisLc25/bank-log-engine"
  },
  {
 title: "Aero ADS-B Flight Tracker",
  category: "AÉRONAUTIQUE & F1",
  badge: "Données spatiales temps réel",
  desc: "Visualiseur de routes aériennes et logs radar avec calculs des profils d'altitude, de dérive et estimation de consommation carburant.",
  tech: ["Python", "Streamlit", "Folium", "Plotly", "Aéronautique"],
  demo: "https://aero-flight-tracker.streamlit.app", // <-- Ajoute cette ligne (ou demoUrl / live selon ton code)
  github: "https://github.com/MathisLc25/aero-flight-tracker" // ou link
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
            <div className="flex justify-between items-start mb-4 gap-4">
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              {project.link !== "#" && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-semibold border border-emerald-500/30 px-3 py-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors whitespace-nowrap shadow-sm"
                >
                  GitHub ↗
                </a>
              )}
            </div>
            <p className="text-slate-400 text-sm mb-6 font-normal leading-relaxed">
              {project.desc}
            </p>
          </div>
          
          <p className="text-xs font-medium text-slate-500 border-t border-slate-800/60 pt-4">
            {project.tech}
          </p>
        </div>
      ))}
    </div>
  );
}