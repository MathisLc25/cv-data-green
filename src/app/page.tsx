"use client";

import { useState } from "react";
import ProjectSection from "@/components/ProjectCard";
import SkillsRadar from "@/components/SkillsRadar";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour, je suis le jumeau numerique de Mathis. Posez-moi vos questions sur son parcours, ses projets, ses interets ou ses competences. Je me ferai un plaisir d'y repondre." }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = { role: "user", content: inputMessage };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInputMessage("");

    setMessages([...updatedMessages, { role: "assistant", content: "Recherche en cours..." }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error("Erreur");

      const data = await response.json();
      
      setMessages([...updatedMessages, { role: "assistant", content: data.content }]);
    } catch (error) {
      console.error(error);
      setMessages([...updatedMessages, { role: "assistant", content: "Desole, une erreur est survenue. Veuillez reessayer." }]);
    }
  };

  return (
    <main className="bg-[#080c14] text-slate-200 min-h-screen flex flex-col items-center px-4 sm:px-8 py-16 md:py-28 antialiased selection:bg-emerald-600/30">
      
      <section className="w-full max-w-4xl mb-24 md:mb-36">
        <header className="flex flex-col items-start gap-6">
          <div className="flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Recherche Alternance • Septembre 2026 • Rythme ECE</span>
          </div>

          <div className="text-xs font-medium tracking-wide text-emerald-500">
            ECE Bordeaux • Deuxieme annee de Bachelor
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-none">
            Mathis <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Ladine Caloc</span>
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-slate-400 leading-relaxed font-normal">
            Etudiant en informatique specialise en <span className="text-white font-medium">Data & Intelligence Artificielle</span>. 
            Passionne par la valorisation des donnees, les technologies numeriques et l aeronautique.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 w-full sm:w-auto">
            <span className="px-3 py-1.5 text-xs border border-slate-800 rounded-lg bg-slate-900/50 text-slate-300 text-center">
              Brevet d Initiation Aeronautique
            </span>
            <span className="px-3 py-1.5 text-xs border border-slate-800 rounded-lg bg-slate-900/50 text-slate-300 text-center">
              Anglais B2
            </span>
            <a 
              href="/cv_mathis_v2.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-lg shadow-emerald-600/10 text-center"
            >
              Consulter mon CV PDF
            </a>
          </div>
        </header>
      </section>

      <section className="w-full max-w-4xl mb-24 md:mb-36">
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-white tracking-tight">
            Profil & Competences
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent mt-2"></div>
        </div>
        <div className="w-full overflow-hidden py-4 flex justify-center bg-slate-900/20 border border-slate-900 rounded-2xl p-6">
          <div className="w-full max-w-md">
            <SkillsRadar />
          </div>
        </div>
      </section>

      <section className="w-full max-w-4xl mb-24 md:mb-36">
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-white tracking-tight">
            Expertises techniques
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent mt-2"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { label: "Data & IA", skills: "Python, Pandas, NumPy" },
            { label: "Bases de donnees", skills: "SQL, MySQL, MongoDB" },
            { label: "Developpement", skills: "Java, C, JavaScript" },
            { label: "Web & Interfaces", skills: "HTML5, CSS3, Tailwind, Next.js" },
            { label: "Outils & DevOps", skills: "Git, GitHub, Linux" }
          ].map((item) => (
            <div key={item.label} className="p-6 rounded-xl border border-slate-900 bg-slate-900/20 hover:border-slate-800 hover:bg-slate-900/40 transition-all duration-200">
              <p className="text-xs font-medium text-emerald-400 mb-2">
                {item.label}
              </p>
              <p className="text-sm text-slate-300 font-normal">{item.skills}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-4xl mb-24 md:mb-36">
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-white tracking-tight">
            Projets selectionnes
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent mt-2"></div>
        </div>
        <ProjectSection />
      </section>

      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="w-[calc(100vw-2rem)] sm:w-96 h-[480px] bg-[#0e131f] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all">
            <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-xs font-semibold text-white">Assistant Virtuel Mathis</p>
                  <p className="text-[10px] text-slate-400">Profil professionnel</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-white text-xs p-1 rounded-md hover:bg-slate-800 transition-colors"
              >
                Fermer
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 text-xs">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`max-w-[85%] p-3.5 rounded-xl leading-relaxed font-normal ${
                    msg.role === "user" 
                      ? "bg-emerald-600 text-white self-end rounded-tr-none shadow-md shadow-emerald-600/5" 
                      : "bg-slate-900 text-slate-300 self-start rounded-tl-none border border-slate-800/60"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900/50 flex gap-2">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Posez votre question..." 
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
              <button 
                type="submit" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-md shadow-emerald-600/10"
              >
                Envoyer
              </button>
            </form>
          </div>
        ) : (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-5 py-3 rounded-xl shadow-xl shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all font-medium text-xs tracking-wide"
          >
            Discuter avec son jumeau numerique
          </button>
        )}
      </div>

      <footer className="w-full max-w-4xl mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
        <div className="flex gap-6">
          <a href="mailto:theomat04@gmail.com" className="hover:text-emerald-400 transition-colors">theomat04@gmail.com</a>
          <a href="https://github.com/MathisLc25" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">GitHub</a>
        </div>
        <p className="text-slate-600 text-center sm:text-right">
          2026 Mathis Ladine Caloc
        </p>
      </footer>
    </main>
  );
}