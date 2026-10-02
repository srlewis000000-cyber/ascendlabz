import React, { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Block, CONTACT, InfoPage } from "../content";

const renderBlock = (b: Block, i: number) => {
  if ("h" in b) return <h2 key={i} className="mb-3 mt-10 text-2xl text-ink first:mt-0">{b.h}</h2>;
  if ("q" in b) {
    return (
      <details key={i} className="group border-b border-line py-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
          {b.q}
          <span className="text-xl leading-none text-ink-soft transition-transform group-open:rotate-45">+</span>
        </summary>
        <p className="mt-3 leading-relaxed text-ink-soft">{b.a}</p>
      </details>
    );
  }
  if ("ul" in b) {
    return (
      <ul key={i} className="mb-4 list-disc space-y-1.5 pl-6 leading-relaxed text-ink-soft">
        {b.ul.map((li, j) => <li key={j}>{li}</li>)}
      </ul>
    );
  }
  return <p key={i} className="mb-4 leading-relaxed text-ink-soft">{b.p}</p>;
};

export const InfoPageView: React.FC<{ page: InfoPage }> = ({ page }) => (
  <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
    <h1 className="text-4xl text-ink sm:text-5xl">{page.title}</h1>
    {page.updated && <p className="mt-2 text-sm text-ink-soft">Last updated: {page.updated}</p>}
    <div className="mt-8">{page.blocks.map(renderBlock)}</div>
  </article>
);

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", comment: "" });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  // No backend form endpoint yet: hand the message to the visitor's mail app.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.comment}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Website inquiry from " + (form.name || form.email))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-4xl text-ink sm:text-5xl">Contact</h1>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Have a question about an order or one of our research peptides? Send us a message using the form below, or reach us directly:
      </p>
      <ul className="mt-6 space-y-3 text-ink">
        <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-brand" /><a href={`mailto:${CONTACT.email}`} className="hover:text-brand">{CONTACT.email}</a></li>
        <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-brand" /><a href={CONTACT.phoneHref} className="hover:text-brand">{CONTACT.phone}</a></li>
        <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />{CONTACT.address}</li>
      </ul>
      <p className="mt-6 text-ink-soft">We typically respond to inquiries within 1-2 business days.</p>

      <form onSubmit={submit} className="mt-10 grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="c-name">Name</label>
        <input id="c-name" className="field" placeholder="Name" value={form.name} onChange={set("name")} />
        <label className="sr-only" htmlFor="c-email">Email</label>
        <input id="c-email" className="field" type="email" required placeholder="Email *" value={form.email} onChange={set("email")} />
        <label className="sr-only" htmlFor="c-phone">Phone</label>
        <input id="c-phone" className="field sm:col-span-2" type="tel" placeholder="Phone" value={form.phone} onChange={set("phone")} />
        <label className="sr-only" htmlFor="c-comment">Comment</label>
        <textarea id="c-comment" className="field min-h-36 sm:col-span-2" required placeholder="Comment" value={form.comment} onChange={set("comment")} />
        <div className="sm:col-span-2">
          <button className="btn-dark px-10">Submit</button>
          {sent && <p className="mt-3 text-sm text-ink-soft">Your email app should open with your message ready to send. If it doesn't, email us at {CONTACT.email}.</p>}
        </div>
      </form>
    </div>
  );
};
