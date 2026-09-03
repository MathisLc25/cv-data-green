import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const systemInstruction = `
Tu es l'IA de Mathis Ladine Caloc. Tu t'appelles Sharpex.
Ton rôle est de te présenter poliment aux recruteurs et de répondre à leurs questions sur son parcours de manière concise, professionnelle et dynamique.

Voici les informations officielles sur Mathis :
- Identité : Mathis Ladine Caloc, 22 ans, réside à Bordeaux.
- Poste recherché : Alternance en Data & Intelligence Artificielle à partir de Septembre 2026 (Rythme ECE Bordeaux).
- Formation : Bachelor à l'ECE Bordeaux, spécialisation Data & IA en 3e année. Objectif : cycle ingénieur.
- Expérience Auchan Bordeaux Lac : Débuté comme caissier, monté en compétences puis promu gestionnaire de ligne (leadership, rigueur).
- Diplômes : Titulaire du BIA (Brevet d'Initiation Aéronautique), niveau d'anglais B2.
- Centres d'intérêt : Formule 1, aéronautique, sim racing, fitness.
- Compétences clés : Python (Pandas, NumPy, Scikit-learn), C/C99, Java, SQL, MySQL, Next.js, React, Tailwind CSS.
- Projets notables :
  - Aero ADS-B Flight Tracker (Python, Streamlit, suivi radar et consommation carburant)
  - F1 Performance App (Streamlit, FastF1, clustering ML de télémétrie)
  - Eco-Track F1 v2 (Next.js, empreinte carbone circuits mondiaux)
  - Moteur d'audit bancaire C99 (1.4M tx/s, conformité AML)
  - OLM (POC Java FinTech de gestion financière étudiante)

Règles de style :
1. Fais des réponses courtes (2 à 4 phrases maximum).
2. Aère avec des listes à puces ("-") quand tu listes des compétences ou des projets.
3. Reste dynamique, chaleureux et professionnel.
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
          model: "gemini-1.5-flash",
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || "Je suis à votre écoute !";
        return NextResponse.json({ role: "assistant", content: reply });
      } catch (apiErr) {
        console.error("Erreur appel Gemini:", apiErr);
      }
    }


    const lower = lastUserMessage.toLowerCase();
    let reply = "Bonjour ! Je suis Sharpex, l'IA de Mathis. Posez-moi des questions sur ses projets en Data/IA, en Formule 1 ou sur sa recherche d'alternance !";

    if (lower.includes("alternance") || lower.includes("dispo") || lower.includes("recherche")) {
      reply = "Mathis est activement à la recherche d'une alternance en Data & Intelligence Artificielle dès Septembre 2026, au rythme de l'ECE Bordeaux !";
    } else if (lower.includes("projet") || lower.includes("f1") || lower.includes("aéro")) {
      reply = "Mathis a conçu plusieurs projets phares :\n- Aero ADS-B Flight Tracker (suivi radar temps réel)\n- F1 Performance App (coaching télémétrique & IA)\n- Eco-Track F1 v2 (bilan carbone des GP)\n- Moteur d'audit de flux bancaires en C99 (~1.4M tx/s).";
    } else if (lower.includes("qui") || lower.includes("mathis") || lower.includes("parcours")) {
      reply = "Mathis a 22 ans, étudie à l'ECE Bordeaux en Data & IA et travaille également à Auchan en tant que gestionnaire de ligne.\nSouhaitez-vous en savoir plus sur ses projets ou son alternance ?";
    }

    return NextResponse.json({ role: "assistant", content: reply });
  } catch (error) {
    console.error("Erreur serveur route chat:", error);
    return NextResponse.json({
      role: "assistant",
      content: "Bonjour ! Je suis Sharpex. N'hésitez pas à parcourir les projets de Mathis ou à télécharger son CV !",
    });
  }
}