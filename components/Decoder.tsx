import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { decodeLetter } from '../services/geminiService';
import { AnalysisResult, LoadingState } from '../types';

export const Decoder: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLoading(LoadingState.SCANNING);
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setPreview(base64);
        
        // Remove data URL prefix for API
        const base64Data = base64.split(',')[1];
        
        try {
          setLoading(LoadingState.PROCESSING);
          const data = await decodeLetter(base64Data);
          setResult(data);
          setLoading(LoadingState.COMPLETE);
        } catch (err) {
          setLoading(LoadingState.ERROR);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
      <button onClick={onBack} className="text-xs text-tac-green/70 mb-4 hover:text-tac-green text-left font-mono">
        &lt; RETURN TO BASE
      </button>

      <h2 className="text-2xl font-bold mb-1 text-white">INTEL DECODER</h2>
      <p className="text-xs text-gray-400 mb-6 font-mono border-l-2 border-tac-green pl-2">
        UPLOAD VA CORRESPONDENCE. AI WILL EXTRACT TACTICAL DATA.
      </p>

      {/* Upload Area */}
      {!result && (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-tac-green/30 rounded-lg bg-tac-gray/50 p-8 relative overflow-hidden">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          
          {loading === LoadingState.IDLE && (
            <>
              <Upload className="w-12 h-12 text-tac-green mb-4" />
              <p className="text-sm font-bold text-tac-green">TAP TO SCAN DOCUMENT</p>
              <p className="text-xs text-gray-500 mt-2">SUPPORTS: JPG, PNG</p>
            </>
          )}

          {loading !== LoadingState.IDLE && loading !== LoadingState.ERROR && (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-tac-green border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-mono text-tac-green animate-pulse">{loading}...</p>
            </div>
          )}
          
           {loading === LoadingState.ERROR && (
            <div className="flex flex-col items-center text-tac-red">
              <AlertCircle className="w-12 h-12 mb-4" />
              <p className="text-sm font-bold">SCAN FAILED</p>
              <p className="text-xs mt-2">TRY AGAIN</p>
            </div>
          )}
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-6 pb-20">
            {preview && (
                <div className="w-full h-32 overflow-hidden rounded border border-tac-green/30 relative">
                    <img src={preview} alt="Scan" className="w-full h-full object-cover opacity-50 grayscale" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                         <CheckCircle2 className="w-8 h-8 text-tac-green" />
                    </div>
                </div>
            )}

          {/* BLUF Box */}
          <div className="border border-tac-green bg-tac-green/5 p-4 relative">
            <div className="absolute -top-3 left-3 bg-black px-2 text-xs font-bold text-tac-green">
              B.L.U.F. (BOTTOM LINE UP FRONT)
            </div>
            <p className="text-lg font-bold text-white leading-tight mt-2">
              {result.bluf}
            </p>
          </div>

          {/* Deadlines - RED ALERT */}
          {result.deadlines && result.deadlines.length > 0 && (
            <div className="border border-tac-red bg-tac-red/5 p-4 relative">
               <div className="absolute -top-3 left-3 bg-black px-2 text-xs font-bold text-tac-red flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  CRITICAL TIMINGS
               </div>
               <ul className="mt-2 space-y-2">
                 {result.deadlines.map((d, i) => (
                   <li key={i} className="flex items-start text-tac-red font-mono font-bold text-sm">
                     <span className="mr-2">[{i+1}]</span> {d}
                   </li>
                 ))}
               </ul>
            </div>
          )}

          {/* Next Steps */}
          <div>
            <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Mission Objectives</h3>
            <div className="space-y-3">
              {result.nextSteps.map((step, i) => (
                <div key={i} className="flex items-start bg-tac-gray p-3 border-l-2 border-tac-amber">
                  <span className="text-tac-amber font-mono mr-3">0{i+1}</span>
                  <p className="text-sm text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
          
           <button 
            onClick={() => {
                setResult(null);
                setPreview(null);
                setLoading(LoadingState.IDLE);
            }} 
            className="w-full py-3 bg-tac-gray border border-tac-green text-tac-green mt-8 font-mono hover:bg-tac-green hover:text-black transition-colors"
           >
            SCAN NEXT DOCUMENT
           </button>
        </div>
      )}
    </div>
  );
};