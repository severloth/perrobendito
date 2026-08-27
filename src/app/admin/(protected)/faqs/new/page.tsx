import { createFaq } from "../actions";
import { FormShell, Field, inputClass } from "@/components/admin/FormShell";

export default function NewFaqPage() {
  return (
    <FormShell title="Nueva pregunta frecuente" backHref="/admin/faqs">
      <form action={createFaq} className="flex flex-col gap-5">
        <Field label="Pregunta" htmlFor="question">
          <input id="question" name="question" required className={inputClass} />
        </Field>
        <Field label="Respuesta" htmlFor="answer">
          <textarea id="answer" name="answer" rows={4} required className={inputClass} />
        </Field>
        <Field label="Orden" htmlFor="order">
          <input id="order" name="order" type="number" defaultValue={0} className={inputClass} />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked />
          Publicado (visible en la web)
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Crear pregunta
        </button>
      </form>
    </FormShell>
  );
}
