"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = undefined;

const fieldClass =
  "mt-2 w-full border-b border-zinc-300 bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-zinc-900";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  if (state?.success) {
    return (
      <div className="border-t border-zinc-200 py-10 text-center">
        <p className="font-display text-xl">¡Gracias por escribirnos!</p>
        <p className="mt-2 text-sm text-zinc-600">Te vamos a responder a la brevedad.</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-6">
      <div>
        <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-zinc-400">
          Nombre
        </label>
        <input id="name" name="name" type="text" className={fieldClass} />
        {state?.errors?.name && <p className="mt-1 text-xs text-red-600">{state.errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact" className="text-xs uppercase tracking-[0.2em] text-zinc-400">
          Email o teléfono
        </label>
        <input id="contact" name="contact" type="text" className={fieldClass} />
        {state?.errors?.contact && <p className="mt-1 text-xs text-red-600">{state.errors.contact}</p>}
      </div>

      <div>
        <label htmlFor="reason" className="text-xs uppercase tracking-[0.2em] text-zinc-400">
          Motivo de tu consulta
        </label>
        <select id="reason" name="reason" defaultValue="Clases" className={`${fieldClass} bg-white`}>
          <option value="Clases">Clases</option>
          <option value="Marketing">Marketing</option>
          <option value="Otro">Otro</option>
        </select>
        {state?.errors?.reason && <p className="mt-1 text-xs text-red-600">{state.errors.reason}</p>}
      </div>

      <div>
        <label htmlFor="detail" className="text-xs uppercase tracking-[0.2em] text-zinc-400">
          Disciplina o detalle (opcional)
        </label>
        <input
          id="detail"
          name="detail"
          type="text"
          placeholder="Ej: Guitarra, Identidad visual..."
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-zinc-400">
          Contanos más sobre tu proyecto o consulta
        </label>
        <textarea id="message" name="message" rows={4} className={fieldClass} />
        {state?.errors?.message && <p className="mt-1 text-xs text-red-600">{state.errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-700 disabled:opacity-60 disabled:hover:scale-100"
      >
        {pending ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
