"use client";

const projects = [
  {
    title: "Analyse Data F1",
    desc: "Optimisation des stratégies de course via l'analyse de données historiques de télémétrie.",
    tech: "Python, Pandas, Matplotlib",
    link: "https://github.com/MathisLc25/f1-tire-analysis"
  },
  {
    title: "OLM (POC)",
    desc: "Développement d'un Proof of Concept pour un système de gestion financière sécurisé (Test Technique).",
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
    title: "Gestion Commerciale & SQL",
    desc: "Modélisation MCD/MLD et implémentation d'une base de données SQL pour flux commerciaux.",
    tech: "SQL, MySQL",
    link: "#"
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