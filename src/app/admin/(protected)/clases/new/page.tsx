import { prisma } from "@/lib/prisma";
import { createClass } from "../actions";
import { FormShell, Field, inputClass } from "@/components/admin/FormShell";
import { FileUploadField } from "@/components/admin/FileUploadField";

export default async function NewClassPage() {
  const teachers = await prisma.teacher.findMany({ orderBy: { name: "asc" } });

  return (
    <FormShell title="Nueva clase" backHref="/admin/clases">
      <form action={createClass} className="flex flex-col gap-5">
        <Field label="Título" htmlFor="title">
          <input id="title" name="title" required className={inputClass} />
        </Field>
        <Field label="Slug (URL, se genera solo si lo dejás vacío)" htmlFor="slug">
          <input id="slug" name="slug" placeholder="ej: guitarra" className={inputClass} />
        </Field>
        <Field label="Etiqueta (Clase / Servicio)" htmlFor="kicker">
          <input id="kicker" name="kicker" defaultValue="Clase" className={inputClass} />
        </Field>
        <Field label="Resumen corto" htmlFor="summary">
          <input id="summary" name="summary" className={inputClass} />
        </Field>
        <Field label="Descripción completa" htmlFor="description">
          <textarea id="description" name="description" rows={5} className={inputClass} />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Nivel" htmlFor="level">
            <input id="level" name="level" className={inputClass} />
          </Field>
          <Field label="Duración" htmlFor="duration">
            <input id="duration" name="duration" className={inputClass} />
          </Field>
          <Field label="Modalidad" htmlFor="modality">
            <input id="modality" name="modality" className={inputClass} />
          </Field>
        </div>
        <Field label="Docente" htmlFor="teacherId">
          <select id="teacherId" name="teacherId" defaultValue="" className={inputClass}>
            <option value="">Sin asignar</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Foto" htmlFor="photo">
          <FileUploadField name="photoUrl" kind="image" />
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
          Crear clase
        </button>
      </form>
    </FormShell>
  );
}
