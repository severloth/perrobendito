import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateFaq, deleteFaq } from "../actions";
import { FormShell, Field, inputClass } from "@/components/admin/FormShell";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await prisma.faq.findUnique({ where: { id } });
  if (!faq) notFound();

  const updateWithId = updateFaq.bind(null, id);
  const deleteWithId = deleteFaq.bind(null, id);

  return (
    <FormShell title="Editar pregunta frecuente" backHref="/admin/faqs">
      <form action={updateWithId} className="flex flex-col gap-5">
        <Field label="Pregunta" htmlFor="question">
          <input id="question" name="question" required defaultValue={faq.question} className={inputClass} />
        </Field>
        <Field label="Respuesta" htmlFor="answer">
          <textarea id="answer" name="answer" rows={4} required defaultValue={faq.answer} className={inputClass} />
        </Field>
        <Field label="Orden" htmlFor="order">
          <input id="order" name="order" type="number" defaultValue={faq.order} className={inputClass} />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={faq.published} />
          Publicado (visible en la web)
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Guardar cambios
        </button>
      </form>

      <form action={deleteWithId} className="mt-4 border-t border-zinc-100 pt-4">
        <button type="submit" className="text-sm text-red-600 hover:underline">
          Eliminar pregunta
        </button>
      </form>
    </FormShell>
  );
}
