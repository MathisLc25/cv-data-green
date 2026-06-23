"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'Data (Python/SQL)', A: 65, fullMark: 100 },
  { subject: 'Logiciel (Java, C)', A: 75, fullMark: 100 },
  { subject: 'Aéronautique (BIA)', A: 60, fullMark: 100 },
  { subject: 'Anglais (B2)', A: 75, fullMark: 100 },
  { subject: 'Frontend (HTML/CSS)', A: 75, fullMark: 100 }, 
  { subject: 'Formule 1', A: 90, fullMark: 100 },
];

export default function SkillsRadar() {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        {/* outerRadius passé à 55% pour laisser respirer le texte long sur les côtés */}
        <RadarChart cx="50%" cy="50%" outerRadius="55%" data={data}>
          {/* Grille couleur zinc-800 pour matcher avec le nouveau thème noir */}
          <PolarGrid stroke="#27272a" />
          {/* Texte couleur zinc-400 */}
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 500 }} 
          />
          <Radar
            name="Mathis"
            dataKey="A"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.25}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}