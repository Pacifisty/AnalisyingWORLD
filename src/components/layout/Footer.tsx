import Link from 'next/link';
import { TrendingUp, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-slate-900" />
              </div>
              <span className="font-bold text-white text-lg">
                Analisying<span className="text-emerald-400">World</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Análise esportiva inteligente powered by IA. Dados, estatísticas e análises
              profissionais para o torcedor apaixonado.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Plataforma</h3>
            <ul className="space-y-2">
              {[
                { href: '/search', label: 'Buscar Times' },
                { href: '/games', label: 'Jogos do Dia' },
                { href: '/compare', label: 'Comparador' },
                { href: '/plans', label: 'Planos' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Conta</h3>
            <ul className="space-y-2">
              {[
                { href: '/login', label: 'Entrar' },
                { href: '/register', label: 'Criar Conta' },
                { href: '/dashboard', label: 'Painel' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} AnalisyingWorld — Análise Esportiva com Inteligência Artificial
          </p>
        </div>
      </div>
    </footer>
  );
}
