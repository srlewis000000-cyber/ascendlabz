import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";

const STORAGE_KEY = "researcher-verified";

const Checkbox = ({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) => (
  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line px-4 py-3.5 text-left text-sm leading-relaxed text-ink-soft transition-colors hover:border-brand/50">
    <input type="checkbox" className="peer sr-only" checked={checked} onChange={e => onChange(e.target.checked)} />
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-400 peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40">
      {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
    </span>
    <span>{children}</span>
  </label>
);

export const AgeGate: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [isResearcher, setIsResearcher] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "true") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const enter = () => {
    try { localStorage.setItem(STORAGE_KEY, "true"); } catch {}
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-gradient-to-b from-[#0b1420] to-[#0d1b2a] p-4" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="my-auto w-full max-w-md rounded-2xl bg-white px-6 py-8 text-center shadow-2xl sm:px-8">
        <p className="text-[1.65rem] tracking-wide text-ink">ASCEND<span className="text-brand">LABZ</span></p>
        <p className="mt-1 text-[11px] font-bold tracking-[0.25em] text-ink-soft">RESEARCH PEPTIDES</p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {["99%+ Purity", "COA Verified", "Ships in 24 Hrs"].map(t => (
            <span key={t} className="rounded-md border border-brand/40 px-3 py-1.5 text-xs font-semibold text-brand-dark">{t}</span>
          ))}
        </div>

        <hr className="my-6 border-line" />

        <h2 id="gate-title" className="text-2xl text-ink">Researcher Verification</h2>
        <p className="mt-2 text-sm text-ink-soft">Access is restricted to qualified researchers purchasing for in-vitro laboratory use only.</p>

        <div className="mt-5 space-y-3">
          <Checkbox checked={isAdult} onChange={setIsAdult}>
            I am at least <strong className="text-ink">21 years of age</strong>.
          </Checkbox>
          <Checkbox checked={isResearcher} onChange={setIsResearcher}>
            I confirm I am a <strong className="text-ink">qualified researcher</strong> purchasing for <strong className="text-ink">in-vitro / laboratory research</strong> only — not for human or veterinary use.
          </Checkbox>
        </div>

        <button onClick={enter} disabled={!isAdult || !isResearcher} className="btn-primary mt-6 w-full py-3.5 text-base">
          Enter AscendLabz →
        </button>
        <a href="https://www.google.com" className="mt-4 inline-block text-xs text-ink-soft underline">No, exit site</a>

        <hr className="my-6 border-line" />
        <p className="text-[11px] leading-relaxed text-ink-soft">
          By proceeding you affirm the statements above are true. Products are not for human or veterinary use, not for use in diagnostic procedures, and have not been evaluated by the U.S. Food and Drug Administration.
        </p>
      </div>
    </div>
  );
};
