import React, { useState } from 'react';
import { ViewState } from './types';
import { TopNav } from './components/TopNav';
import { Dashboard } from './components/Dashboard';
import { Decoder } from './components/Decoder';
import { ClaimFighter } from './components/ClaimFighter';
import { ProtocolRed } from './components/ProtocolRed';
import { Shield } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [protocolRedActive, setProtocolRedActive] = useState(false);

  const renderView = () => {
    switch (view) {
      case 'DECODER':
        return <Decoder onBack={() => setView('DASHBOARD')} />;
      case 'FIGHTER':
        return <ClaimFighter onBack={() => setView('DASHBOARD')} />;
      default:
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-tac-black text-tac-green font-mono pb-20 relative selection:bg-tac-green selection:text-black">
      <TopNav />
      
      <main className="max-w-2xl mx-auto p-4">
        {renderView()}
      </main>

      {/* Protocol Red - Persistent Safety Net */}
      {!protocolRedActive && (
        <button
          onClick={() => setProtocolRedActive(true)}
          className="fixed bottom-6 right-6 z-40 bg-tac-gray border-2 border-tac-red rounded-full p-4 shadow-lg shadow-red-900/20 hover:bg-tac-red hover:text-black transition-all group"
          aria-label="Protocol Red"
        >
          <Shield className="w-6 h-6 text-tac-red group-hover:text-black" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-tac-red text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            PROTOCOL RED
          </span>
        </button>
      )}

      {protocolRedActive && (
        <ProtocolRed onClose={() => setProtocolRedActive(false)} />
      )}
    </div>
  );
};

export default App;