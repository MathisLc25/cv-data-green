Set-Content -Path "src/app/olm/page.tsx" -Value @'
'use client';

import Link from 'next/link';
import { ArrowLeft, Wallet, ArrowUpRight, ArrowDownRight, PiggyBank, ReceiptText } from 'lucide-react';

export default function OlmBudgetPage() {
  const kpis = [
    { label: 'Budget Mensuel Alloué', val: '€ 850.00', sub: 'Reste : € 214.50', icon: Wallet, color: 'text-emerald-400' },
    { label: 'Dépenses du mois', val: '€ 635.50', sub: '74.8% du budget', icon: ArrowDownRight, color: 'text-amber-400' },
    { label: 'Épargne de précaution', val: '€ 120.00', sub: '+15% vs mois dernier', icon: PiggyBank, color: 'text-blue-400' },
    { label: 'Transactions catégorisées', val: '34', sub: 'Import CSV actif', icon: ReceiptText, color: 'text-purple-400' },
  ];

  const expenses = [
    { label: 'Loyer & Charges', amount: '€ 420.00', pct: 49, color: 'bg-emerald-500' },
    { label: 'Alimentation & Courses', amount: '€ 125.30', pct: 20, color: 'bg-blue-500' },
    { label: 'Transports & Mobilité', amount: '€ 32.50', pct: 5, color: 'bg-amber-500' },
    { label: 'Sorties & Loisirs', amount: '€ 57.70', pct: 9, color: 'bg-purple-500' },
  ];

  const transactions = [
    { title: 'Supermarché Auchan', date: '04 Sept 2026', cat: 'Alimentation', amount: '-€ 38.40', type: 'debit' },
    { title: 'Abonnement TBM / Transport', date: '01 Sept 2026', cat: 'Transport', amount: '-€ 32.50', type: 'debit' },
    { title: 'Virement CROUS / Bourse', date: '01 Sept 2026', cat: 'Revenu', amount: '+€ 450.00', type: 'credit' },
    { title: 'Résidence étudiante', date: '01 Sept 2026', cat: 'Logement', amount: '-€ 420.00', type: 'debit' },
    { title: 'Cinéma & Sortie', date: '28 Août 2026', cat: 'Loisirs', amount: '-€ 14.50', type: 'debit' },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Retour au portfolio
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-mono">
              FastAPI backend : opérationnel
            </span>
            <a
              href="https://olm-dashboard-1.onrender.com/docs"
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-1 bg-white/5 text-gray-300 hover:text-white border border-white/10 rounded-full transition-colors font-mono"
            >
              Swagger Docs ↗
            </a>
          </div>
        </div>

        {/* Titre */}
        <div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">OLM — Gestionnaire de Budget Étudiant</h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Plateforme de pilotage financier personnel : catégorisation automatique des transactions, alertes de dépassement et import CSV.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl">
              <div className="flex justify-between items-start text-gray-400 mb-3">
                <span className="text-xs uppercase tracking-wider font-mono">{k.label}</span>
                <k.icon size={18} className={k.color} />
              </div>
              <div className="text-2xl font-bold">{k.val}</div>
              <div className="text-xs text-gray-400 mt-2 font-mono">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Deux colonnes : répartition + historique */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Répartition */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold">Répartition des Postes</h2>
            <div className="space-y-4">
              {expenses.map((e, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{e.label}</span>
                    <span className="font-mono text-gray-400">{e.amount}</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${e.color}`} style={{ width: `${e.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Dernières Transactions Traitées</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-gray-400 border-b border-white/10 font-mono">
                  <tr>
                    <th className="pb-3">Opération</th>
                    <th className="pb-3">Catégorie</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right">Montant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {transactions.map((t, i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 font-medium">{t.title}</td>
                      <td className="py-3.5">
                        <span className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300">
                          {t.cat}
                        </span>
                      </td>
                      <td className="py-3.5 text-gray-400 text-xs font-mono">{t.date}</td>
                      <td className={`py-3.5 text-right font-mono font-medium ${t.type === 'credit' ? 'text-emerald-400' : 'text-gray-200'}`}>
                        {t.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
'@ -Encoding utf8