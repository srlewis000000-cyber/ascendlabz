import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface BitcoinPaymentProps {
  address: string;
  amount: number;
  onInitiate: () => void;
  disabled?: boolean;
}

export const BitcoinPayment: React.FC<BitcoinPaymentProps> = ({ address, amount, onInitiate, disabled }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[140px] h-[140px] bg-white border border-slate-200 rounded-xl p-2 flex items-center justify-center shrink-0">
          <QRCodeSVG value={address} size={124} bgColor="#FFFFFF" fgColor="#000000" includeMargin={false} />
        </div>
        
        <div className="flex-1 space-y-4">
          <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Send Bitcoin Payment</p>
          <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
            Please send the exact BTC amount to the address below. Your order will be processed once confirmed on the blockchain.
          </p>

          <div className="bg-white border border-slate-200 p-3 rounded-xl flex justify-between items-center group">
            <code className="text-[13px] font-mono text-slate-900 break-all font-bold">{address}</code>
            <button 
              onClick={copyToClipboard}
              className="text-[11px] font-black text-blue-600 uppercase shrink-0 transition-colors hover:text-blue-700"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 mt-4">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 font-medium leading-relaxed">
              After sending payment, email a screenshot of your transaction to <a href="mailto:Ascendlabz@gmail.com" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-amber-900">Ascendlabz@gmail.com</a> with your order number as the subject. Your order will be processed once payment is verified.
            </p>
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest border border-orange-100">
            Status: Awaiting Payment
          </div>
        </div>
      </div>

      <button
        onClick={onInitiate}
        disabled={disabled}
        className="w-full mt-6 bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 disabled:hover:bg-slate-300 transition-all shadow-lg shadow-blue-600/10 active:scale-[0.98]"
      >
        I'VE SENT THE PAYMENT
      </button>
    </div>
  );
};
