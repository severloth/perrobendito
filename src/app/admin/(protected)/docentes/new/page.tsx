import { createTeacher } from "../actions";
import { FormShell, Field, inputClass } from "@/components/admin/FormShell";
import { FileUploadField } from "@/components/admin/FileUploadField";

export default function NewTeacherPage() {
  return (
    <FormShell title="Nuevo docente" backHref="/admin/docentes">
      <form action={createTeacher} className="flex flex-col gap-5">
        <Field label="Nombre" htmlFor="name">
          <input id="name" name="name" required className={inputClass} />
        </Field>
        <Field label="Disciplina" htmlFor="discipline">
          <input id="discipline" name="discipline" required placeholder="Ej: Guitarra, Marketing" className={inputClass} />
        </Field>
        <Field label="Bio (opcional)" htmlFor="bio">
          <textarea id="bio" name="bio" rows={3} className={inputClass} />
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
          Crear docente
        </button>
      </form>
    </FormShell>
  );
}
