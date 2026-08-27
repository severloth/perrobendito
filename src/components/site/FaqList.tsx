"use client";

import { useState } from "react";

type Faq = { id: string; question: string; answer: string };

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (faqs.length === 0) {
    return <p className="text-sm text-zinc-500">Todavía no hay preguntas frecuentes cargadas.</p>;
  }

  return (
    <div className="flex flex-col divide-y divide-zinc-200 border-t border-zinc-200">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-zinc-600"
            >
              <span className={isOpen ? "font-medium text-zinc-900" : "text-zinc-800"}>{faq.question}</span>
              <span
                className={`shrink-0 text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-sm leading-relaxed text-zinc-600">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
