export type ViewState = 'DASHBOARD' | 'DECODER' | 'FIGHTER' | 'PROTOCOL_RED';

export interface AnalysisResult {
  bluf: string;
  deadlines: string[];
  nextSteps: string[];
  rawText?: string;
}

export interface FighterResult {
  professionalText: string;
  regulations: string[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  PROCESSING = 'PROCESSING',
  DECRYPTING = 'DECRYPTING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}