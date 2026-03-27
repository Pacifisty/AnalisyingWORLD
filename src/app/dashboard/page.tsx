import Link from 'next/link';
import { mockTeams, mockMatches } from '@/lib/mock-data';
import { Star, Clock, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Meu Painel</h1>
      <p className="text-slate-400 mb-8">Seus favoritos e histórico de análises</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[{label:'Análises Vistas',value:'12',icon:TrendingUp,color:'text-emerald-400'},{label:'Times Favoritos',value:'4',icon:Star,color:'text-yellow-400'},{label:'Histórico',value:'28',icon:Clock,color:'text-blue-400'}].map(s=>(
          <div key={s.label} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <s.icon className={`w-6 h-6 ${s.color} mb-3`}/>
            <p className="text-3xl font-bold text-white">{s.value}</p>
            <p className="text-slate-400 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400"/>Times Favoritos</h2>
          <div className="space-y-3">
            {mockTeams.slice(0,4).map(t=>(
              <Link key={t.id} href={`/team/${t.id}`} className="flex items-center gap-3 hover:bg-slate-700 rounded-lg p-2 transition-colors">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold text-white">{t.name.slice(0,2)}</div>
                <div><p className="text-sm font-medium text-white">{t.name}</p><p className="text-xs text-slate-500">{t.league}</p></div>
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400"/>Análises Recentes</h2>
          <div className="space-y-3">
            {mockMatches.slice(0,4).map(m=>(
              <Link key={m.id} href={`/match/${m.id}`} className="flex items-center gap-3 hover:bg-slate-700 rounded-lg p-2 transition-colors">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-1 flex-shrink-0"/>
                <p className="text-sm text-white">{m.homeTeam.name} × {m.awayTeam.name}<span className="text-slate-500 ml-2 text-xs">{m.competition}</span></p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
