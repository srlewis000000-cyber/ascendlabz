import React from 'react';
import { ShieldCheck, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface COADisplayProps {
  product: Product;
  onClose?: () => void;
}

export const COADisplay: React.FC<COADisplayProps> = ({ product, onClose }) => {
  if (!product.coa) return null;

  const { coa } = product;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl max-w-2xl w-full mx-auto">
      {/* Header */}
      <div className="bg-[#00a651] p-6 text-white flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-black tracking-tight leading-none mb-1">TEST REPORT</h2>
          <p className="text-xs font-bold tracking-widest opacity-80 uppercase">VERIFIED ANALYTICAL DATA</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black">JANOSHIK</div>
          <p className="text-[10px] font-bold opacity-80">info@janoshik.com</p>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Task Number</label>
              <div className="font-bold text-slate-900 bg-slate-50 px-3 py-1.5 rounded border border-slate-100">{coa.taskNumber}</div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Test Date</label>
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {coa.date}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Client</label>
              <div className="font-bold text-slate-900 truncate">AscendLabz</div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Sample</label>
              <div className="font-bold text-slate-900">{product.name} {product.mg}</div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00a651]" />
            LABORATORY RESULTS
          </h3>
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-bottom border-slate-200">
                  <th className="px-4 py-3 text-left font-black uppercase tracking-wider text-slate-500 text-[10px]">Parameter</th>
                  <th className="px-4 py-3 text-right font-black uppercase tracking-wider text-slate-500 text-[10px]">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">{product.name} Content</td>
                  <td className="px-4 py-3 text-right font-black text-slate-900">{coa.content}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">HPLC Purity</td>
                  <td className="px-4 py-3 text-right font-black text-[#00a651]">{coa.purity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification Footer */}
        <div className="bg-slate-50 p-6 rounded-xl space-y-4 border border-slate-100">
          <div className="flex items-center gap-3 text-slate-500">
            <FileText className="w-5 h-5 opacity-50" />
            <p className="text-[10px] font-bold leading-relaxed">
              VERIFY THIS TEST AT WWW.JANOSHIK.COM/VERIFY/ WITH THE UNIQUE KEY BELOW:
            </p>
          </div>
          <div className="bg-white p-4 text-center rounded-lg border border-slate-200">
            <div className="text-xl font-mono font-black tracking-[0.3em] text-slate-900">{coa.key}</div>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#00a651]">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">AUTHENTICITY CONFIRMED</span>
          </div>
        </div>
      </div>
      
      {onClose && (
        <div className="p-6 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-colors"
          >
            CLOSE REPORT
          </button>
        </div>
      )}
    </div>
  );
};
