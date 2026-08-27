"use server";

import { z } from "zod";
import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

const TeacherSchema = z.object({
  name: z.string().min(2, "Ingresá un nombre."),
  discipline: z.string().min(2, "Ingresá una disciplina."),
  bio: z.string().optional().default(""),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(false),
});

// El archivo ya se subio a Blob desde el navegador: aca solo llega la URL.
// Campo ausente o vacio = no se toco el archivo, se conserva el actual.
function resolvePhotoUrl(formData: FormData, existing = "") {
  const value = formData.get("photoUrl");
  if (typeof value !== "string") return existing;
  return value;
}

export async function createTeacher(formData: FormData) {
  await verifySession();
  const parsed = TeacherSchema.parse({
    name: formData.get("name"),
    discipline: formData.get("discipline"),
    bio: formData.get("bio") ?? "",
    order: formData.get("order") ?? 0,
    published: formData.get("published") === "on",
  });

  const photoUrl = resolvePhotoUrl(formData);

  await prisma.teacher.create({ data: { ...parsed, photoUrl } });
  revalidatePath("/admin/docentes");
  revalidatePath("/quienes-somos");
  redirect("/admin/docentes");
}

export async function updateTeacher(id: string, formData: FormData) {
  await verifySession();
  const existing = await prisma.teacher.findUniqueOrThrow({ where: { id } });
  const parsed = TeacherSchema.parse({
    name: formData.get("name"),
    discipline: formData.get("discipline"),
    bio: formData.get("bio") ?? "",
    order: formData.get("order") ?? 0,
    published: formData.get("published") === "on",
  });

  const photoUrl = resolvePhotoUrl(formData, existing.photoUrl);

  await prisma.teacher.update({ where: { id }, data: { ...parsed, photoUrl } });
  revalidatePath("/admin/docentes");
  revalidatePath("/quienes-somos");
  revalidatePath("/clases");
  revalidatePath("/marketing");
  redirect("/admin/docentes");
}

export async function deleteTeacher(id: string) {
  await verifySession();
  await prisma.teacher.delete({ where: { id } });
  revalidatePath("/admin/docentes");
  revalidatePath("/quienes-somos");
  revalidatePath("/clases");
  revalidatePath("/marketing");
  redirect("/admin/docentes", RedirectType.replace);
}
