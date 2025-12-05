import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export const TopNav: React.FC = () => {
  return (
    <div className="w-full border-b border-tac-green/30 bg-tac-black/90 backdrop-blur sticky top-0 z-40">
      <div className="flex justify-between items-center p-4 max-w-2xl mx-auto">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-tac-green animate-pulse" />
          <h1 className="text-xl font-bold tracking-tighter text-tac-green">OVERWATCH</h1>
        </div>
        
        <div className="flex items-center space-x-2 border border-tac-green/50 px-2 py-1 rounded bg-tac-green-dim">
          <ShieldCheck className="w-3 h-3 text-tac-green" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-tac-green">
            Encryption Active
          </span>
        </div>
      </div>
    </div>
  );
};