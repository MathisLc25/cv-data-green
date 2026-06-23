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
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          {/* Lignes du radar passées en gris très foncé pour être subtiles */}
          <PolarGrid stroke="#1e293b" />
          {/* Police standard au lieu de monospace */}
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
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