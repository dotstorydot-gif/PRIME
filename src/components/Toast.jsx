import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="bg-[#1C1A18] text-[#FAF8F5] border border-wood-800 shadow-xl px-5 py-3.5 flex items-center space-x-3 text-xs tracking-wide">
        {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
        {isError && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-4 h-4 text-wood-300 shrink-0" />}
        <span className="font-medium font-sans">{toast.message}</span>
      </div>
    </div>
  );
}
