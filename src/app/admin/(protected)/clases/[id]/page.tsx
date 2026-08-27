import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateClass, deleteClass } from "../actions";
import { FormShell, Field, inputClass } from "@/components/admin/FormShell";
import { FileUploadField } from "@/components/admin/FileUploadField";

export default async function EditClassPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item, teachers] = await Promise.all([
    prisma.classItem.findUnique({ where: { id } }),
    prisma.teacher.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!item) notFound();

  const updateWithId = updateClass.bind(null, id);
  const deleteWithId = deleteClass.bind(null, id);

  return (
    <FormShell title={`Editar clase: ${item.title}`} backHref="/admin/clases">
      <form action={updateWithId} className="flex flex-col gap-5">
        <Field label="Título" htmlFor="title">
          <input id="title" name="title" required defaultValue={item.title} className={inputClass} />
        </Field>
        <Field label="Slug (URL)" htmlFor="slug">
          <input id="slug" name="slug" defaultValue={item.slug} className={inputClass} />
        </Field>
        <Field label="Etiqueta (Clase / Servicio)" htmlFor="kicker">
          <input id="kicker" name="kicker" defaultValue={item.kicker} className={inputClass} />
        </Field>
        <Field label="Resumen corto" htmlFor="summary">
          <input id="summary" name="summary" defaultValue={item.summary} className={inputClass} />
        </Field>
        <Field label="Descripción completa" htmlFor="description">
          <textarea id="description" name="description" rows={5} defaultValue={item.description} className={inputClass} />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Nivel" htmlFor="level">
            <input id="level" name="level" defaultValue={item.level} className={inputClass} />
          </Field>
          <Field label="Duración" htmlFor="duration">
            <input id="duration" name="duration" defaultValue={item.duration} className={inputClass} />
          </Field>
          <Field label="Modalidad" htmlFor="modality">
            <input id="modality" name="modality" defaultValue={item.modality} className={inputClass} />
          </Field>
        </div>
        <Field label="Docente" htmlFor="teacherId">
          <select id="teacherId" name="teacherId" defaultValue={item.teacherId ?? ""} className={inputClass}>
            <option value="">Sin asignar</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Foto" htmlFor="photo">
          <FileUploadField name="photoUrl" kind="image" currentUrl={item.photoUrl} />
        </Field>
        <Field label="Orden" htmlFor="order">
          <input id="order" name="order" type="number" defaultValue={item.order} className={inputClass} />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={item.published} />
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
          Eliminar clase
        </button>
      </form>
    </FormShell>
  );
}
