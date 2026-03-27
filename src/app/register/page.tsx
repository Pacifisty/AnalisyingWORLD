'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({name:'',email:'',password:''});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r=>setTimeout(r,1000));
    setLoading(false);
    alert('Cadastro simulado com sucesso!');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-7 h-7 text-slate-900"/>
          </div>
          <h1 className="text-2xl font-bold text-white">Criar conta gratuita</h1>
          <p className="text-slate-400 text-sm mt-1">Comece a analisar agora mesmo</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {(['name','email','password'] as const).map(f=>(
              <div key={f}>
                <label className="block text-sm font-medium text-slate-300 mb-1 capitalize">{f==='name'?'Nome':f==='email'?'Email':'Senha'}</label>
                <input type={f==='password'?'password':f==='email'?'email':'text'} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})} required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm outline-none focus:border-emerald-500 transition-colors"/>
              </div>
            ))}
            <button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-900 font-semibold py-3 rounded-lg transition-colors">
              {loading ? 'Criando conta...' : 'Criar conta grátis'}
            </button>
          </form>
          <p className="text-center text-slate-400 text-sm mt-4">Já tem conta? <Link href="/login" className="text-emerald-400 hover:underline">Entrar</Link></p>
        </div>
      </div>
    </div>
  );
}
