"use server";

import { z } from "zod";
import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { slugify } from "@/lib/slugify";

const ClassSchema = z.object({
  title: z.string().min(2, "Ingresá un título."),
  slug: z.string().min(2, "Ingresá un slug."),
  kicker: z.string().min(1).default("Clase"),
  summary: z.string().optional().default(""),
  description: z.string().optional().default(""),
  level: z.string().optional().default("Pendiente"),
  duration: z.string().optional().default("Pendiente"),
  modality: z.string().optional().default("Pendiente"),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(false),
  teacherId: z.string().optional().nullable(),
});

function parseForm(formData: FormData) {
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "");
  return ClassSchema.parse({
    title,
    slug: rawSlug ? slugify(rawSlug) : slugify(title),
    kicker: formData.get("kicker") || "Clase",
    summary: formData.get("summary") ?? "",
    description: formData.get("description") ?? "",
    level: formData.get("level") || "Pendiente",
    duration: formData.get("duration") || "Pendiente",
    modality: formData.get("modality") || "Pendiente",
    order: formData.get("order") ?? 0,
    published: formData.get("published") === "on",
    teacherId: formData.get("teacherId") || null,
  });
}

// El archivo ya se subio a Blob desde el navegador: aca solo llega la URL.
// Campo ausente o vacio = no se toco el archivo, se conserva el actual.
function resolvePhotoUrl(formData: FormData, existing = "") {
  const value = formData.get("photoUrl");
  if (typeof value !== "string") return existing;
  return value;
}

function revalidateAll() {
  revalidatePath("/admin/clases");
  revalidatePath("/clases");
}

export async function createClass(formData: FormData) {
  await verifySession();
  const data = parseForm(formData);
  const photoUrl = resolvePhotoUrl(formData);

  await prisma.classItem.create({ data: { ...data, photoUrl } });
  revalidateAll();
  redirect("/admin/clases");
}

export async function updateClass(id: string, formData: FormData) {
  await verifySession();
  const existing = await prisma.classItem.findUniqueOrThrow({ where: { id } });
  const data = parseForm(formData);
  const photoUrl = resolvePhotoUrl(formData, existing.photoUrl);

  await prisma.classItem.update({ where: { id }, data: { ...data, photoUrl } });
  revalidateAll();
  revalidatePath(`/clases/${existing.slug}`);
  revalidatePath(`/clases/${data.slug}`);
  redirect("/admin/clases");
}

export async function deleteClass(id: string) {
  await verifySession();
  await prisma.classItem.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/clases", RedirectType.replace);
}
