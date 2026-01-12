"use client";

const projects = [
  {
    title: "Analyse Data F1",
    desc: "Optimisation des stratégies de course via l'analyse de données historiques de télémétrie.",
    tech: "Python, Pandas, Matplotlib",
    link: "https://github.com/MathisLc25/F1-Data-Analysis"
  },
  {
    title: "LedgerOne (POC)",
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
          className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-accent/20 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              {project.link !== "#" && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono border border-accent/30 px-2 py-1 rounded text-accent hover:bg-accent hover:text-white transition-all whitespace-nowrap"
                >
                  GITHUB ↗
                </a>
              )}
            </div>
            <p className="text-gray-400 text-sm mb-6 font-light leading-relaxed">
              {project.desc}
            </p>
          </div>
          
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest border-t border-white/5 pt-4">
            {project.tech}
          </p>
        </div>
      ))}
    </div>
  );
}
