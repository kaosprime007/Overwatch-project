import React from 'react';
import { ViewState } from '../types';
import { Scan, ShieldAlert, FileWarning } from 'lucide-react';

interface DashboardProps {
  setView: (view: ViewState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div className="flex flex-col space-y-4 pt-4 animate-in fade-in duration-500">
      
      {/* Status Bar */}
      <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mb-2 px-1">
        <span>SYS.STATUS: ONLINE</span>
        <span>LATENCY: 12ms</span>
      </div>

      {/* Main Feature Cards */}
      <button 
        onClick={() => setView('DECODER')}
        className="group relative w-full h-32 bg-tac-gray border border-tac-green/50 hover:bg-tac-green/10 hover:border-tac-green transition-all overflow-hidden flex items-center px-6 text-left"
      >
        <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
          <Scan className="w-32 h-32 text-tac-green" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white group-hover:text-tac-green flex items-center">
            <Scan className="w-5 h-5 mr-2" /> 
            DECODER
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-[80%]">
            Upload VA Letters. Extract deadlines. Get tactical summary.
          </p>
        </div>
        <div className="absolute bottom-2 right-2 text-[10px] text-tac-green font-mono opacity-50">
          [INIT]
        </div>
      </button>

      <button 
        onClick={() => setView('FIGHTER')}
        className="group relative w-full h-32 bg-tac-gray border border-tac-amber/50 hover:bg-tac-amber/10 hover:border-tac-amber transition-all overflow-hidden flex items-center px-6 text-left"
      >
        <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
          <FileWarning className="w-32 h-32 text-tac-amber" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white group-hover:text-tac-amber flex items-center">
            <ShieldAlert className="w-5 h-5 mr-2" /> 
            CLAIM FIGHTER
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-[80%]">
            Convert grievances into regulation-compliant legal arguments.
          </p>
        </div>
        <div className="absolute bottom-2 right-2 text-[10px] text-tac-amber font-mono opacity-50">
          [EXEC]
        </div>
      </button>

      {/* Footer Info */}
      <div className="mt-8 border-t border-gray-800 pt-4">
        <p className="text-[10px] text-gray-600 font-mono text-center">
          OVERWATCH SYS V1.0 // UNCLASSIFIED // FOUO
        </p>
      </div>
    </div>
  );
};