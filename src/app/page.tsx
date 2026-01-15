import ProjectSection from "@/components/ProjectCard";
import SkillsRadar from "@/components/SkillsRadar";

export default function Home() {
  return (
    <main className="bg-subtle min-h-screen flex flex-col items-center px-6 py-20 md:py-32">
      
      {/* --- 00 // HEADER & HERO --- */}
      <section className="w-full max-w-4xl mb-32">
        <header className="flex flex-col items-start gap-6">
          
          {/* Badge de disponibilité Alternance */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <p className="text-[10px] font-mono text-accent uppercase tracking-wider">
              Recherche Alternance • Septembre 2026 • Rythme ECE
            </p>
          </div>

          <div className="flex items-center gap-3">
             <span className="h-px w-8 bg-accent"></span>
             <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">
               ECE Bordeaux • Bachelor 2
             </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-white leading-tight">
            Mathis Ladine Caloc
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed font-light">
            Étudiant en informatique spécialisé en <span className="text-white font-normal">Data & IA</span>. 
            Je cherche à progresser et améliorer mes compétences dans les domaines du numérique.
          </p>

          {/* Badges et Bouton CV */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="px-3 py-1 text-[11px] border border-white/10 rounded-full bg-white/5 text-gray-300 font-mono">
              BIA Aéronautique
            </span>
            <span className="px-3 py-1 text-[11px] border border-white/10 rounded-full bg-white/5 text-gray-300 font-mono">
              Anglais B2
            </span>
            <a 
  href="/CV_Mathis_Ladine_Caloc.pdf" 
  target="_blank" file:///C:/Users/theom/Downloads/CV%20Mathis%20(1).pdf
  className="px-4 py-1 text-[11px] border border-accent/40 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all font-mono font-bold ml-2"
>
  Consulter CV.pdf
</a>
          </div>
        </header>
      </section>

      {/* --- 01 // DATA PROFILE (RADAR CHART) --- */}
      <section className="w-full max-w-4xl mb-32">
        <div className="mb-12">
          <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4 italic">
            1°: Profil
          </h2>
          <div className="h-px w-full bg-white/5 mb-12"></div>
        </div>
        
        <SkillsRadar />
      </section>

      {/* --- 01.5 // STACK TECHNIQUE --- */}
      <section className="w-full max-w-4xl mb-32">
        <div className="mb-12">
          <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4 italic">
            2°: Hard Skills
          </h2>
          <div className="h-px w-full bg-white/5 mb-12"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Data & IA", skills: "Python, Pandas" },
            { label: "Databases", skills: "SQL, MySQL, MongoDB" },
            { label: "Développement", skills: "Java, C, JavaScrit" },
            { label: "Web & UI", skills: "HTML5, CSS3, Tailwind, Next.js" },
            { label: "Outils", skills: "Git, Linux" }
          ].map((item) => (
            <div 
              key={item.label} 
              className="p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-accent/20 transition-colors group"
            >
              <p className="text-[10px] font-mono text-accent mb-1 uppercase tracking-tighter group-hover:tracking-widest transition-all">
                {item.label}
              </p>
              <p className="text-sm font-medium text-gray-300">
                {item.skills}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 02 // PROJETS SÉLECTIONNÉS --- */}
      <section className="w-full max-w-4xl mb-32">
        <div className="mb-12">
          <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4 italic">
            3°: Projets 
          </h2>
          <div className="h-px w-full bg-white/5 mb-12"></div>
        </div>
        
        <ProjectSection />
      </section>
{/* --- 02.5 // SOFT SKILLS & EXPÉRIENCE --- */}
      <section className="w-full max-w-4xl mb-32">
        <div className="mb-12">
          <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4 italic">
            4° : Soft Skills
          </h2>
          <div className="h-px w-full bg-white/5 mb-12"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Soft Skills */}
          <div className="space-y-4">
            <h3 className="text-white font-medium mb-4">Compétences Humaines</h3>
            <div className="flex flex-wrap gap-2">
              {["Rigueur", "Esprit d'analyse", "Travail d'équipe", "Autonomie", "Adaptabilité"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-400">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Expérience Auchan formulée pour un ingénieur */}
          <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01]">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-medium">Expérience Opérationnelle</h3>
              <span className="text-[10px] font-mono text-accent">Auchan</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed italic">
              "Développement de la rigueur opérationnelle et du sens des responsabilités en milieu professionnel , grande surface. 
              Une expérience qui permet d'accroitre mes capacités d'adaptation ."
            </p>
          </div>
        </div>
      </section>
      {/* --- 03 // VISION & AMBITION --- */}
      <section className="w-full max-w-4xl mb-32 p-8 rounded-2xl border border-accent/20 bg-accent/[0.02] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[60px] leading-none pointer-events-none select-none">
          IA
        </div>

        <h2 className="text-xl font-medium mb-6 text-white uppercase tracking-tight">
          Pourquoi me recruter ?
        </h2>
        
        <p className="text-gray-400 leading-relaxed font-light text-base md:text-lg italic">
          Me recruter en alternance en <span className="text-white font-normal">B3</span>, c’est faire le choix d’un étudiant sérieux, motivé et déjà engagé dans son projet professionnel. 
          Actuellement en Bachelor Informatique, je possède de <span className="text-white font-normal">solides bases en programmation, en algorithmique et en systèmes informatiques</span>, 
          que je souhaite mettre en pratique au sein d’une entreprise tout en continuant à développer mes compétences.
        </p>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full max-w-4xl mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 opacity-50 hover:opacity-100 transition-opacity">
        <div className="flex gap-8 text-xs font-mono">
          <a href="mailto:theomat04@gmail.com" className="hover:text-accent transition-colors">theomat04@gmail.com</a>
          <a href="#" className="hover:text-accent transition-colors">LinkedIn : Mathis LC</a>
        </div>
        <p className="text-[10px] font-mono uppercase tracking-tighter">
          © 2026 • Mathis Ladine Caloc • Bordeaux, FR
        </p>
      </footer>
    </main>
  );
}