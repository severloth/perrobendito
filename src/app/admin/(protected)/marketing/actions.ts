"use server";

import { z } from "zod";
import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { slugify } from "@/lib/slugify";

const ServiceSchema = z.object({
  title: z.string().min(2, "Ingresá un título."),
  slug: z.string().min(2, "Ingresá un slug."),
  kicker: z.string().min(1).default("Servicio"),
  summary: z.string().optional().default(""),
  description: z.string().optional().default(""),
  scope: z.string().optional().default("Pendiente"),
  duration: z.string().optional().default("Pendiente"),
  format: z.string().optional().default("Pendiente"),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(false),
  teacherId: z.string().optional().nullable(),
});

function parseForm(formData: FormData) {
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "");
  return ServiceSchema.parse({
    title,
    slug: rawSlug ? slugify(rawSlug) : slugify(title),
    kicker: formData.get("kicker") || "Servicio",
    summary: formData.get("summary") ?? "",
    description: formData.get("description") ?? "",
    scope: formData.get("scope") || "Pendiente",
    duration: formData.get("duration") || "Pendiente",
    format: formData.get("format") || "Pendiente",
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
  revalidatePath("/admin/marketing");
  revalidatePath("/marketing");
}

export async function createService(formData: FormData) {
  await verifySession();
  const data = parseForm(formData);
  const photoUrl = resolvePhotoUrl(formData);

  await prisma.serviceItem.create({ data: { ...data, photoUrl } });
  revalidateAll();
  redirect("/admin/marketing");
}

export async function updateService(id: string, formData: FormData) {
  await verifySession();
  const existing = await prisma.serviceItem.findUniqueOrThrow({ where: { id } });
  const data = parseForm(formData);
  const photoUrl = resolvePhotoUrl(formData, existing.photoUrl);

  await prisma.serviceItem.update({ where: { id }, data: { ...data, photoUrl } });
  revalidateAll();
  revalidatePath(`/marketing/${existing.slug}`);
  revalidatePath(`/marketing/${data.slug}`);
  redirect("/admin/marketing");
}

export async function deleteService(id: string) {
  await verifySession();
  await prisma.serviceItem.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/marketing", RedirectType.replace);
}
