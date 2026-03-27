import Link from 'next/link';
import { Check } from 'lucide-react';

const plans = [
  {name:'Gratuito',price:'R$ 0',period:'para sempre',color:'border-slate-700',btn:'bg-slate-700 text-white hover:bg-slate-600',features:['5 análises por dia','Dados básicos de times','Forma recente','Score de desempenho']},
  {name:'Premium',price:'R$ 29',period:'por mês',color:'border-emerald-500',btn:'bg-emerald-500 text-slate-900 hover:bg-emerald-400',badge:'Mais Popular',features:['Análises ilimitadas','Análise com GPT-4','Alertas personalizados','Histórico completo','Comparador avançado','Dados de lesões em tempo real','Exportar relatórios PDF']},
];

export default function PlansPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold text-white mb-4">Escolha seu plano</h1>
      <p className="text-slate-400 mb-12 text-lg">Acesso completo à análise esportiva com IA</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {plans.map(p=>(
          <div key={p.name} className={`bg-slate-800 border-2 ${p.color} rounded-2xl p-6 relative`}>
            {'badge' in p && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>}
            <h2 className="text-xl font-bold text-white mb-1">{p.name}</h2>
            <p className="text-3xl font-extrabold text-white mb-1">{p.price}</p>
            <p className="text-slate-500 text-sm mb-6">{p.period}</p>
            <ul className="space-y-3 mb-6 text-left">
              {p.features.map(f=>(
                <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0"/>{f}
                </li>
              ))}
            </ul>
            <Link href="/register" className={`block w-full py-3 rounded-lg font-semibold transition-colors ${p.btn}`}>
              Começar agora
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
