import TeamComparator from '@/components/compare/TeamComparator';
export default function ComparePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Comparador de Times</h1>
      <p className="text-slate-400 mb-8">Compare dois times lado a lado com dados estatísticos</p>
      <TeamComparator/>
    </div>
  );
}
