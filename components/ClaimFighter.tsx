import React, { useState } from 'react';
import { PenTool, Copy, Check } from 'lucide-react';
import { fightClaim } from '../services/geminiService';
import { FighterResult, LoadingState } from '../types';

export const ClaimFighter: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<FighterResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFight = async () => {
    if (!input.trim()) return;
    setLoading(LoadingState.PROCESSING);
    try {
      const data = await fightClaim(input);
      setResult(data);
      setLoading(LoadingState.COMPLETE);
    } catch (err) {
      setLoading(LoadingState.ERROR);
    }
  };

  const copyToClipboard = () => {
    if (result?.professionalText) {
      navigator.clipboard.writeText(result.professionalText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
      <button onClick={onBack} className="text-xs text-tac-green/70 mb-4 hover:text-tac-green text-left font-mono">
        &lt; RETURN TO BASE
      </button>

      <h2 className="text-2xl font-bold mb-1 text-white">CLAIM FIGHTER</h2>
      <p className="text-xs text-gray-400 mb-6 font-mono border-l-2 border-tac-amber pl-2">
        CONVERT ISSUES INTO REGULATION-COMPLIANT ARGUMENTS.
      </p>

      {!result ? (
        <div className="space-y-4">
          <label className="text-xs text-tac-green uppercase font-bold block">
            Situation Report (What happened?)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: My tinnitus claim was denied because they said there was no noise exposure in my service record, but I was an artilleryman."
            className="w-full h-40 bg-tac-gray border border-tac-green/30 rounded p-4 text-white placeholder-gray-600 focus:border-tac-green focus:outline-none font-mono text-sm"
          />
          
          <button
            onClick={handleFight}
            disabled={loading === LoadingState.PROCESSING || !input.trim()}
            className="w-full py-4 bg-tac-green text-black font-bold uppercase tracking-wider hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading === LoadingState.PROCESSING ? 'GENERATING COUNTER-FIRE...' : 'GENERATE ARGUMENT'}
          </button>
        </div>
      ) : (
        <div className="space-y-6 pb-20">
           <div className="bg-tac-gray border border-tac-green p-4 relative">
             <div className="absolute -top-3 left-3 bg-black px-2 text-xs font-bold text-tac-green">
               OUTPUT (COPY & PASTE)
             </div>
             <p className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap mt-2">
               {result.professionalText}
             </p>
             <button 
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 hover:bg-white/10 rounded"
             >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
             </button>
           </div>

           <div>
             <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase">Identified Regulations</h3>
             <div className="flex flex-wrap gap-2">
               {result.regulations.map((reg, i) => (
                 <span key={i} className="text-xs bg-tac-amber/10 text-tac-amber border border-tac-amber/30 px-2 py-1 font-mono">
                   {reg}
                 </span>
               ))}
             </div>
           </div>

           <button 
            onClick={() => {
                setResult(null);
                setInput('');
                setLoading(LoadingState.IDLE);
            }} 
            className="w-full py-3 bg-tac-gray border border-gray-700 text-gray-400 mt-4 font-mono hover:text-white"
           >
            NEW ENTRY
           </button>
        </div>
      )}
    </div>
  );
};