import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateTeacher, deleteTeacher } from "../actions";
import { FormShell, Field, inputClass } from "@/components/admin/FormShell";
import { FileUploadField } from "@/components/admin/FileUploadField";

export default async function EditTeacherPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const teacher = await prisma.teacher.findUnique({ where: { id } });
  if (!teacher) notFound();

  const updateWithId = updateTeacher.bind(null, id);
  const deleteWithId = deleteTeacher.bind(null, id);

  return (
    <FormShell title={`Editar docente: ${teacher.name}`} backHref="/admin/docentes">
      <form action={updateWithId} className="flex flex-col gap-5">
        <Field label="Nombre" htmlFor="name">
          <input id="name" name="name" required defaultValue={teacher.name} className={inputClass} />
        </Field>
        <Field label="Disciplina" htmlFor="discipline">
          <input id="discipline" name="discipline" required defaultValue={teacher.discipline} className={inputClass} />
        </Field>
        <Field label="Bio (opcional)" htmlFor="bio">
          <textarea id="bio" name="bio" rows={3} defaultValue={teacher.bio} className={inputClass} />
        </Field>
        <Field label="Foto" htmlFor="photo">
          <FileUploadField name="photoUrl" kind="image" currentUrl={teacher.photoUrl} />
        </Field>
        <Field label="Orden" htmlFor="order">
          <input id="order" name="order" type="number" defaultValue={teacher.order} className={inputClass} />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={teacher.published} />
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
          Eliminar docente
        </button>
      </form>
    </FormShell>
  );
}
