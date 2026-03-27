import { Bot } from 'lucide-react';

interface AIAnalysisTextProps {
  text: string;
}

export default function AIAnalysisText({ text }: AIAnalysisTextProps) {
  const paragraphs = text.split('\n\n').filter(Boolean);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center">
          <Bot className="w-4 h-4 text-emerald-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Análise por IA</h3>
        <span className="ml-auto text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5">
          GPT-4
        </span>
      </div>
      <div className="space-y-3">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-slate-300 text-sm leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
