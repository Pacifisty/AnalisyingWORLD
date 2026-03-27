import SearchBar from './SearchBar';
import { BarChart2, Users, Trophy } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-sm font-medium">Análises em tempo real</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Análise Esportiva com{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
            Inteligência Artificial
          </span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
          Obtenha análises profundas de times e partidas geradas por IA, com dados dos últimos
          6 meses, contexto atual e tendências estatísticas. Tome decisões mais inteligentes.
        </p>

        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar large />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <BarChart2 className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white">10k+</p>
            <p className="text-xs text-slate-500">Análises</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">500+</p>
            <p className="text-xs text-slate-500">Times</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">50+</p>
            <p className="text-xs text-slate-500">Competições</p>
          </div>
        </div>
      </div>
    </section>
  );
}
