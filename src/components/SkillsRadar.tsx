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
    <div className="w-full h-[400px] py-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#9ca3af', fontSize: 11, fontFamily: 'monospace' }} 
          />
          <Radar
            name="Mathis"
            dataKey="A"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}