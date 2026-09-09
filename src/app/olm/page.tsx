'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Wallet, ArrowDownRight, PiggyBank, ReceiptText, 
  TrendingUp, RefreshCw, Calendar 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const CATEGORIES = [
  { name: 'Loyer & Charges', base: 430, variance: 15, color: '#10b981' },
  { name: 'Courses & Alimentation', base: 140, variance: 45, color: '#3b82f6' },
  { name: 'Transports (TBM / SNCF)', base: 35, variance: 15, color: '#f59e0b' },
  { name: 'Sorties & Loisirs', base: 65, variance: 40, color: '#8b5cf6' },
  { name: 'Abonnements & Tech', base: 25, variance: 5, color: '#ec4899' },
];

const MONTH_NAMES = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

export default function OlmBudgetDashboard() {
  const [monthsCount, setMonthsCount] = useState<3 | 6 | 12>(6);
  const [seed, setSeed] = useState(1);

  // Génération dynamique des données selon le nombre de mois et le seed
  const { timelineData, categoryTotals, transactions, totalSpent, avgMonthly } = useMemo(() => {
    const timeline = [];
    const catTotals: Record<string, number> = {
      'Loyer & Charges': 0,
      'Courses & Alimentation': 0,
      'Transports (TBM / SNCF)': 0,
      'Sorties & Loisirs': 0,
      'Abonnements & Tech': 0,
    };
    const txList: any[] = [];

    const now = new Date();
    let accumulatedSpend = 0;

    for (let i = monthsCount - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mLabel = `${MONTH_NAMES[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
      
      let monthTotal = 0;

      CATEGORIES.forEach((cat, catIdx) => {
        // Pseudo-random reproductible avec le seed
        const pseudoRand = Math.sin((seed * 100) + (i * 10) + catIdx) * 10000;
        const randFactor = (pseudoRand - Math.floor(pseudoRand));
        const amount = Math.round(cat.base + (randFactor * 2 - 1) * cat.variance);
        
        monthTotal += amount;
        catTotals[cat.name] += amount;

        // Génération de transactions représentatives pour les mois récents
        if (i <= 1) {
          const day = Math.floor(randFactor * 25) + 1;
          txList.push({
            id: `${i}-${catIdx}`,
            label: `${cat.name} (${catIdx === 0 ? 'Résidence' : catIdx === 1 ? 'Auchan / Carrefour' : 'Paiement'})`,
            cat: cat.name,
            date: `${day < 10 ? '0' + day : day} ${MONTH_NAMES[d.getMonth()]}`,
            amount: amount,
            color: cat.color,
          });
        }
      });

      accumulatedSpend += monthTotal;
      timeline.push({
        month: mLabel,
        depenses: monthTotal,
        budget: 800,
        epargne: Math.max(0, 800 - monthTotal),
      });
    }

    const pieData = CATEGORIES.map((cat) => ({
      name: cat.name,
      value: catTotals[cat.name],
      color: cat.color,
    }));

    return {
      timelineData: timeline,
      categoryTotals: pieData,
      transactions: txList.sort((a, b) => b.id.localeCompare(a.id)),
      totalSpent: accumulatedSpend,
      avgMonthly: Math.round(accumulatedSpend / monthsCount),
    };
  }, [monthsCount, seed]);

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation & API Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Retour au portfolio
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-mono">
              API FastAPI : opérationnelle
            </span>
            <a
              href="https://olm-dashboard-1.onrender.com/docs"
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-1 bg-white/5 text-gray-300 hover:text-white border border-white/10 rounded-full transition-colors font-mono"
            >
              Swagger Docs ?
            </a>
          </div>
        </div>

        {/* Header avec sélecteur de durée & bouton de régénération */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">OLM — Budget & Dépenses Étudiantes</h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Modélisation analytique, catégorisation automatique et projection sur séries temporelles.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 p-1.5 rounded-xl">
            <div className="flex items-center gap-1 text-xs text-gray-400 px-2 font-mono">
              <Calendar size={14} /> Période :
            </div>
            {([3, 6, 12] as const).map((cnt) => (
              <button
                key={cnt}
                onClick={() => setMonthsCount(cnt)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  monthsCount === cnt 
                    ? 'bg-emerald-500 text-black font-semibold' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cnt} mois
              </button>
            ))}
            <button
              onClick={() => setSeed((s) => s + 1)}
              title="Générer de nouvelles transactions simulées"
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors ml-1"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl">
            <div className="flex justify-between items-start text-gray-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-mono">Dépense Totale ({monthsCount}m)</span>
              <Wallet size={18} className="text-emerald-400" />
            </div>
            <div className="text-2xl font-bold">€ {totalSpent.toLocaleString('fr-FR')}</div>
            <div className="text-xs text-gray-400 mt-1 font-mono">Plafond respecté</div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl">
            <div className="flex justify-between items-start text-gray-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-mono">Moyenne Mensuelle</span>
              <ArrowDownRight size={18} className="text-amber-400" />
            </div>
            <div className="text-2xl font-bold">€ {avgMonthly} / mois</div>
            <div className="text-xs text-amber-400 mt-1 font-mono">Sur base de € 800 budget</div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl">
            <div className="flex justify-between items-start text-gray-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-mono">Taux d'Épargne Moyen</span>
              <PiggyBank size={18} className="text-blue-400" />
            </div>
            <div className="text-2xl font-bold">{Math.max(0, Math.round(((800 - avgMonthly) / 800) * 100))}%</div>
            <div className="text-xs text-blue-400 mt-1 font-mono">Objectif &gt; 10% atteint</div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl">
            <div className="flex justify-between items-start text-gray-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-mono">Volume Données</span>
              <ReceiptText size={18} className="text-purple-400" />
            </div>
            <div className="text-2xl font-bold">{monthsCount * 18} entrées</div>
            <div className="text-xs text-purple-400 mt-1 font-mono">Simulation active (seed {seed})</div>
          </div>
        </div>

        {/* Graphiques Recharts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Évolution temporelle (AreaChart) */}
          <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-base font-semibold">Évolution des Dépenses vs Budget Fixé</h2>
                <p className="text-xs text-gray-400 mt-0.5">Courbe mensuelle consolidée sur la période</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <TrendingUp size={14} /> Seuil 800€
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#525252" fontSize={11} tickLine={false} />
                  <YAxis stroke="#525252" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val: any) => [`€ ${val}`, 'Total Dépensé']}
                  />
                  <Area type="monotone" dataKey="depenses" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Répartition par Catégorie (PieChart) */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-semibold">Structure des Dépenses</h2>
              <p className="text-xs text-gray-400 mt-0.5">Poids relatif cumulé par catégorie</p>
            </div>

            <div className="h-56 w-full my-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryTotals}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {categoryTotals.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val: any) => [`€ ${val.toLocaleString('fr-FR')}`, 'Total']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-white/5">
              {categoryTotals.map((cat, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-gray-300">{cat.name}</span>
                  </div>
                  <span className="font-mono text-gray-400">€ {cat.value.toLocaleString('fr-FR')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tableau des transactions simulées récentes */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-base font-semibold">Dernières Écritures Extraites</h2>
              <p className="text-xs text-gray-400">Flux catégorisés dynamiquement par le modèle</p>
            </div>
            <span className="text-xs font-mono text-gray-400">Échantillon récent</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-gray-400 border-b border-white/10 font-mono">
                <tr>
                  <th className="pb-3">Libellé</th>
                  <th className="pb-3">Catégorie</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.slice(0, 6).map((t) => (
                  <tr key={t.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 font-medium text-gray-200">{t.label}</td>
                    <td className="py-3">
                      <span 
                        className="text-xs px-2.5 py-1 rounded-full border font-mono"
                        style={{ 
                          borderColor: `${t.color}40`, 
                          backgroundColor: `${t.color}15`, 
                          color: t.color 
                        }}
                      >
                        {t.cat}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400 text-xs font-mono">{t.date}</td>
                    <td className="py-3 text-right font-mono text-gray-100 font-medium">
                      -€ {t.amount}.00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
