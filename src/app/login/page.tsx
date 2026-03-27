'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r=>setTimeout(r,1000));
    setLoading(false);
    alert('Login simulado com sucesso!');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-7 h-7 text-slate-900"/>
          </div>
          <h1 className="text-2xl font-bold text-white">Entrar na plataforma</h1>
          <p className="text-slate-400 text-sm mt-1">Acesse suas análises salvas</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="seu@email.com" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm outline-none focus:border-emerald-500 transition-colors"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Senha</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm outline-none focus:border-emerald-500 transition-colors"/>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-900 font-semibold py-3 rounded-lg transition-colors">
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          <p className="text-center text-slate-400 text-sm mt-4">Não tem conta? <Link href="/register" className="text-emerald-400 hover:underline">Criar conta</Link></p>
        </div>
      </div>
    </div>
  );
}
