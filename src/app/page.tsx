"use client";

import { useState, useRef, useEffect } from "react";

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

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Tous");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Bonjour ! Je suis Sharpex, l'IA de Mathis. Posez-moi vos questions sur ses projets, son profil ou sa recherche d'alternance !",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          prompt: text,
          history: newMessages.slice(0, -1),
        }),
      });

      if (!response.ok) throw new Error("Erreur serveur");

      const data = await response.json();
      const replyText = data.reply || data.response || data.message || "Je n'ai pas pu répondre pour le moment.";

      setMessages((prev) => [...prev, { role: "assistant", content: replyText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, une petite erreur s'est produite lors de la connexion. N'hésitez pas à me relancer !",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects =
    selectedCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-12 md:px-16 max-w-6xl mx-auto selection:bg-emerald-500 selection:text-black relative">
      {/* En-tête */}
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-900 pb-8 mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Mathis Ladine Caloc
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              Alternance Sept. 2026
            </span>
          </div>
          <p className="text-emerald-400 font-medium text-base md:text-lg">
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-emerald-500 hover:text-white transition-all text-xs font-semibold text-zinc-300 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]"
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
            className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            Télécharger CV 📄
          </a>
        </div>
      </header>

      {/* Profil & Compétences (Radar Chart calibré) */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-8">
          Profil & Compétences
        </h2>

        <div className="p-6 sm:p-10 rounded-3xl bg-zinc-950/80 border border-zinc-900 flex justify-center items-center overflow-hidden">
          <div className="relative w-full max-w-[620px] aspect-[4/3] flex items-center justify-center">
            <svg className="w-full h-full overflow-visible" viewBox="-300 -180 600 360">
              {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => {
                const r = 120 * scale;
                const points = [0, 60, 120, 180, 240, 300]
                  .map((angle) => {
                    const rad = ((angle - 90) * Math.PI) / 180;
                    return `${(r * Math.cos(rad)).toFixed(2)},${(r * Math.sin(rad)).toFixed(2)}`;
                  })
                  .join(" ");
                return (
                  <polygon
                    key={i}
                    points={points}
                    fill="none"
                    stroke="#27272a"
                    strokeWidth="1"
                  />
                );
              })}

              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = ((angle - 90) * Math.PI) / 180;
                const x = (120 * Math.cos(rad)).toFixed(2);
                const y = (120 * Math.sin(rad)).toFixed(2);
                return (
                  <line
                    key={i}
                    x1="0"
                    y1="0"
                    x2={x}
                    y2={y}
                    stroke="#27272a"
                    strokeWidth="1"
                  />
                );
              })}

              <polygon
                points="0,-108 88,-51 83,48 0,102 -78,45 -93,-54"
                fill="rgba(16, 185, 129, 0.25)"
                stroke="#10b981"
                strokeWidth="2"
                className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              />

              <text x="0" y="-138" fill="#d4d4d8" fontSize="12" textAnchor="middle" fontWeight="500">
                Data (Python/SQL)
              </text>
              <text x="145" y="-56" fill="#d4d4d8" fontSize="12" textAnchor="start" fontWeight="500">
                Logiciel (Java, C)
              </text>
              <text x="145" y="66" fill="#d4d4d8" fontSize="12" textAnchor="start" fontWeight="500">
                Aéronautique (BIA)
              </text>
              <text x="0" y="148" fill="#d4d4d8" fontSize="12" textAnchor="middle" fontWeight="500">
                Anglais (B2)
              </text>
              <text x="-145" y="66" fill="#d4d4d8" fontSize="12" textAnchor="end" fontWeight="500">
                Frontend (HTML/CSS)
              </text>
              <text x="-145" y="-56" fill="#d4d4d8" fontSize="12" textAnchor="end" fontWeight="500">
                Formule 1
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* Expertises techniques */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-8">
          Expertises techniques
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-900">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              DATA & IA
            </h3>
            <p className="text-sm text-zinc-300 font-medium">
              Python, Pandas, NumPy
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-900">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              BASES DE DONNÉES
            </h3>
            <p className="text-sm text-zinc-300 font-medium">
              SQL, MySQL, MongoDB
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-900">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              DÉVELOPPEMENT
            </h3>
            <p className="text-sm text-zinc-300 font-medium">
              Java, C, JavaScript
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-900">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              WEB & INTERFACES
            </h3>
            <p className="text-sm text-zinc-300 font-medium">
              HTML5, CSS3, Tailwind, Next.js
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-900">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              OUTILS & DEVOPS
            </h3>
            <p className="text-sm text-zinc-300 font-medium">
              Git, GitHub, Linux
            </p>
          </div>
        </div>
      </section>

      {/* Projets & Réalisations */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Projets & Réalisations
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Filtrez par domaine technique pour tester les démos en direct ou explorer le code source.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    active
                      ? "bg-emerald-500 text-black border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="p-6 rounded-2xl border border-zinc-800/90 bg-zinc-950/70 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.12)] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-medium">
                      {project.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-zinc-400 text-sm mb-6 font-normal leading-relaxed">
                  {project.desc}
                </p>
              </div>

              <div>
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

                <div className="flex items-center gap-3 pt-2 border-t border-zinc-900">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 px-4 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black transition-all flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
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

      {/* Widget Sharpex */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="w-[360px] sm:w-[400px] h-[520px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
            <div className="p-4 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Sharpex <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-1.5 py-0.2 rounded">IA</span>
                  </h3>
                  <p className="text-[11px] text-zinc-400">Assistant virtuel de Mathis</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                      m.role === "user"
                        ? "bg-emerald-500 text-black font-medium rounded-br-none"
                        : "bg-zinc-900 text-zinc-200 border border-zinc-800/80 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 text-zinc-400 p-3 rounded-2xl rounded-bl-none border border-zinc-800 flex items-center gap-1.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            <div className="px-3 py-1.5 bg-zinc-900/40 border-t border-zinc-900 flex gap-1.5 overflow-x-auto">
              <button
                onClick={() => handleSendMessage("Parle-moi de tes projets en F1")}
                className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 whitespace-nowrap transition-colors"
              >
                🏎️ Projets F1
              </button>
              <button
                onClick={() => handleSendMessage("Quelles sont tes disponibilités pour l'alternance ?")}
                className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 whitespace-nowrap transition-colors"
              >
                📅 Alternance
              </button>
              <button
                onClick={() => handleSendMessage("Quelles sont tes compétences en Data & IA ?")}
                className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 whitespace-nowrap transition-colors"
              >
                📊 Stack Data/IA
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-zinc-900/90 border-t border-zinc-800 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Posez une question sur Mathis..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black font-bold rounded-xl text-xs transition-colors"
              >
                Envoyer
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-zinc-950 border border-emerald-500/40 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:border-emerald-400 transition-all group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
              Discuter avec l'IA
            </span>
          </button>
        )}
      </div>
    </main>
  );
}