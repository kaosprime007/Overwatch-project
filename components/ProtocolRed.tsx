import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Phone, MessageSquare } from 'lucide-react';
import { getBattleBuddyMessage } from '../services/geminiService';

interface ProtocolRedProps {
  onClose: () => void;
}

export const ProtocolRed: React.FC<ProtocolRedProps> = ({ onClose }) => {
  const [message, setMessage] = useState<string>("ESTABLISHING SECURE UPLINK...");

  useEffect(() => {
    // Load initial motivational message
    const loadMessage = async () => {
      const msg = await getBattleBuddyMessage("User activated Protocol Red.");
      setMessage(msg);
    };
    loadMessage();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
      <div className="w-full max-w-md border-2 border-tac-red p-6 relative bg-tac-gray">
        {/* Warning Header */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black px-4 text-tac-red font-bold flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>PROTOCOL RED ACTIVE</span>
        </div>

        {/* Message Content */}
        <div className="mt-8 mb-8 space-y-4">
          <p className="text-xl font-mono text-white leading-relaxed">
            "{message}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 w-full">
          <a 
            href="tel:988" 
            className="flex items-center justify-center w-full py-4 bg-tac-red text-black font-bold text-lg hover:bg-red-500 transition-colors uppercase tracking-widest"
          >
            <Phone className="w-5 h-5 mr-3" />
            Connect: Crisis Line (988)
          </a>

           <button 
             onClick={async () => {
                setMessage("RE-ROUTING...");
                const newMsg = await getBattleBuddyMessage("User requested another message.");
                setMessage(newMsg);
             }}
            className="flex items-center justify-center w-full py-4 border border-white text-white font-bold hover:bg-white/10 transition-colors uppercase tracking-widest"
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            Ping Battle Buddy
          </button>
        </div>

        {/* Close */}
        <button 
          onClick={onClose}
          className="mt-8 text-tac-gray-400 text-sm underline hover:text-white"
        >
          STAND DOWN (CLOSE)
        </button>
      </div>
      
      <p className="mt-12 text-xs text-gray-500 max-w-xs">
        SECURE CHANNEL // 256-BIT ENCRYPTED // NO LOGS KEPT
      </p>
    </div>
  );
};