"use client";

import { useState } from "react";
import ProjectSection from "@/components/ProjectCard";
import SkillsRadar from "@/components/SkillsRadar";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour, je suis l'assistant IA de Mathis. Posez-moi vos questions sur son parcours, ses projets, ses interets ou ses competences. Je me ferai un plaisir d'y repondre." }
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
    <main className="bg-black text-zinc-300 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 py-16 md:py-28 antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      
      <section className="w-full max-w-4xl mb-24 md:mb-36">
        <header className="flex flex-col items-start gap-6">
          <div className="flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Recherche Alternance • Septembre 2026 • Rythme ECE</span>
          </div>

          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            ECE Bordeaux • Bachelor 3
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none">
            Mathis <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Ladine Caloc</span>
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-zinc-400 leading-relaxed font-normal">
            Etudiant en informatique specialise en <span className="text-white font-medium">Data & Intelligence Artificielle</span>. 
            Passionne par la valorisation des données, les technologies numeriques et l'aéronautique.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 w-full sm:w-auto">
            <span className="px-4 py-2 text-xs border border-zinc-800 rounded-xl bg-zinc-900/50 text-zinc-300 text-center font-medium">
              Brevet d'Initiation Aeronautique
            </span>
            <span className="px-4 py-2 text-xs border border-zinc-800 rounded-lg bg-zinc-900/50 text-zinc-300 text-center font-medium">
              Anglais B2
            </span>
            <a 
              href="/cv_mathis_v2.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-lg shadow-emerald-950/50 text-center"
            >
              Consulter mon CV PDF
            </a>
          </div>
        </header>
      </section>

      <section className="w-full max-w-4xl mb-24 md:mb-36">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Profil & Compétences
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent mt-2"></div>
        </div>
        <div className="w-full overflow-hidden py-4 flex justify-center bg-zinc-900/20 border border-zinc-900 rounded-2xl p-4 sm:p-6">
          <div className="w-full max-w-md">
            <SkillsRadar />
          </div>
        </div>
      </section>

      <section className="w-full max-w-4xl mb-24 md:mb-36">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Expertises techniques
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent mt-2"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { label: "Data & IA", skills: "Python, Pandas, NumPy" },
            { label: "Bases de donnees", skills: "SQL, MySQL, MongoDB" },
            { label: "Developpement", skills: "Java, C, JavaScript" },
            { label: "Web & Interfaces", skills: "HTML5, CSS3, Tailwind, Next.js" },
            { label: "Outils & DevOps", skills: "Git, GitHub, Linux" }
          ].map((item) => (
            <div key={item.label} className="p-6 rounded-xl border border-zinc-900 bg-zinc-900/30 hover:border-emerald-500/30 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between">
              <p className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-sm text-zinc-300 font-normal">{item.skills}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-4xl mb-24 md:mb-36">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Projets selectionnés
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent mt-2"></div>
        </div>
        <ProjectSection />
      </section>

      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="w-[calc(100vw-2rem)] sm:w-96 h-[480px] bg-black border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-xs font-semibold text-white">Assistant Virtuel Mathis</p>
                  <p className="text-[10px] text-zinc-500">Profil professionnel</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-zinc-400 hover:text-white text-xs px-2 py-1 rounded-md hover:bg-zinc-900 transition-colors"
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
                      : "bg-zinc-900 text-zinc-300 self-start rounded-tl-none border border-zinc-800/60"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-800 bg-zinc-950 flex gap-2">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Posez votre question..." 
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
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
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-5 py-3 rounded-xl shadow-xl shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all font-medium text-xs tracking-wide"
          >
            Discuter avec son IA
          </button>
        )}
      </div>

      <footer className="w-full max-w-4xl mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-600 text-xs">
        <div className="flex gap-6">
          <a href="mailto:theomat04@gmail.com" className="hover:text-emerald-400 transition-colors">theomat04@gmail.com</a>
          <a href="https://github.com/MathisLc25" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">GitHub</a>
        </div>
        <p className="text-zinc-600 text-center sm:text-right">
          2026 Mathis Ladine Caloc
        </p>
      </footer>
    </main>
  );
}