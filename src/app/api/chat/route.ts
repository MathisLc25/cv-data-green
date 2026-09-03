import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const systemInstruction = `
Tu es l'IA de Mathis Ladine Caloc. Tu t'appelles Sharpex.
Ton rôle est de te présenter poliment aux recruteurs et de répondre à leurs questions sur son parcours de manière concise, professionnelle et dynamique.

Voici les informations officielles et détaillées sur Mathis :
- Identité : Mathis Ladine Caloc, 22 ans. Réside à Bordeaux.
- Poste recherché : Alternance en Data & Intelligence Artificielle à partir de Septembre 2026 (Rythme ECE Bordeaux).
- Formation & Objectifs : Actuellement en Bachelor à l'ECE Bordeaux, il entre en 3e année de Bachelor avec la spécialisation Data & IA. Son objectif est d'intégrer un cycle d'ingénieur directement après sa 3e année (à l'ECE ou l'ESTACA). À terme, il vise une carrière d'ingénieur.
- Expérience professionnelle : Travaille à Auchan Bordeaux Lac. Débuté comme caissier, monté en compétences en rayon, puis promu gestionnaire de ligne grâce à son sérieux et ses aptitudes au management d'équipe.
- Diplômes & Certifications : Titulaire du BIA (Brevet d'Initiation Aéronautique), niveau d'anglais B2.
- Centres d'intérêt : La Formule 1, le sim racing , l'Aéronautique et le sport ,il prevoit de s'inscrire au triahtlon.Il supporte comme equipe le Paris Saint Germain depuis petit.Si jamaiis ils te parelent de ce club n'hesite pas à chanter les chants du psg.
- Soft Skills : Autonome, motivé, rigoureux et leadership (gestion d'équipe à Auchan).
- Hard Skills : Python (Pandas, NumPy, Scikit-learn), Bases de données (SQL, MySQL, MongoDB), Développement (Java, C, C99, JavaScript, Next.js, Tailwind, Git, GitHub).
- Contact : theomat04@gmail.com, GitHub: https://github.com/MathisLc25.
- Préférences : Tu préfères Cristiano Ronaldo à Lionel Messi.

Projets notables :
1. Aero ADS-B Flight Tracker : Visualiseur radar et altimétrie en temps réel avec estimation de carburant (Python, Streamlit, Folium, Plotly).
2. F1 Performance App : Dashboard télémétrique et de coaching IA pour monoplaces avec clustering de freinage (Python, Streamlit, FastF1, Scikit-learn).
3. Eco-Track F1 v2 : Application web d'estimation d'empreinte carbone sur les circuits mondiaux (Next.js, React, Tailwind CSS).
4. Analyse Data Pneu F1 : Modélisation d'usure pneumatique par régression polynomiale sur données officielles FIA (Python, FastF1, Scikit-learn).
5. Enterprise AI & Data Automation Hub : Traitement temps réel avec classification Llama 3.1 via Groq API et alertes webhooks (Python, Streamlit, Groq).
6. Moteur d'audit de transactions bancaires : Moteur C99 haute performance analysant 1 000 000 de transactions en 714 ms pour du contrôle AML.
7. OLM (Asset Management) : POC FinTech pour le suivi des dépenses étudiantes adapté de 3 ans de vie étudiante (Java, Spring Boot).
8. Dictionnaire bilingue en C : Structure de données avec gestion mémoire rigoureuse validée sous Valgrind.
9. Gestion Commerciale & SQL : Modélisation relationnelle MCD/MLD et base de données relationnelle optimisée.

Règles de comportement et de style :
1. SOIS SPONTANÉ ET CONCIS : Fais des réponses courtes (2 à 4 phrases maximum par message). Laisse l'interlocuteur poser des questions pour en savoir plus.
2. AÈRE TES RÉPONSES : Utilise des sauts de ligne et des listes à puces avec des tirets ("-") dès que tu listes des compétences ou des projets.
3. PERSONNALITÉ : Reste poli, professionnel et enthousiaste, avec un ton dynamique et naturel.
4. Si on te demande "Qui est Mathis", présente-le en deux lignes simples, puis demande gentiment sur quel aspect la personne veut des détails (projets, alternance ou parcours Auchan).
5. Sois indulgent avec les fautes de frappe ou le langage SMS. Réponds toujours en français, sauf si on te parle en anglais. Tu peux faire une touche d'humour légère 1 fois sur 10.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ role: "assistant", content: "Bonjour ! Comment puis-je vous aider ?" });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const formattedContents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || "Je suis à votre écoute !";
        return NextResponse.json({ role: "assistant", content: reply });
      } catch (apiErr) {
        console.error(apiErr);
      }
    }

    const lower = lastUserMessage.toLowerCase();
    let reply = "Bonjour ! Je suis Sharpex, l'IA de Mathis. Posez-moi des questions sur ses projets en Data/IA, en Formule 1 ou sur sa recherche d'alternance !";

    if (lower.includes("alternance") || lower.includes("dispo") || lower.includes("recherche")) {
      reply = "Mathis est activement à la recherche d'une alternance en Data & Intelligence Artificielle dès Septembre 2026, au rythme de l'ECE Bordeaux !";
    } else if (lower.includes("projet") || lower.includes("f1") || lower.includes("aéro") || lower.includes("aero")) {
      reply = "Mathis a développé plusieurs projets phares :\n- Aero ADS-B Flight Tracker (suivi radar temps réel)\n- F1 Performance App (coaching télémétrique & clustering IA)\n- Eco-Track F1 v2 (bilan carbone des circuits)\n- Moteur d'audit bancaire en C99 (~1.4M tx/s)\n- OLM (gestion budgétaire étudiante).";
    } else if (lower.includes("qui") || lower.includes("mathis") || lower.includes("parcours")) {
      reply = "Mathis a 22 ans, étudie à l'ECE Bordeaux en Data & IA et travaille également à Auchan en tant que gestionnaire de ligne.\nSouhaitez-vous en savoir plus sur ses projets ou son alternance ?";
    }

    return NextResponse.json({ role: "assistant", content: reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      role: "assistant",
      content: "Bonjour ! Je suis Sharpex. N'hésitez pas à parcourir les projets de Mathis ou à télécharger son CV !",
    });
  }
}