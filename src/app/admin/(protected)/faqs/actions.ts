"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

const FaqSchema = z.object({
  question: z.string().min(3, "Ingresá la pregunta."),
  answer: z.string().min(3, "Ingresá la respuesta."),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(false),
});

function parseForm(formData: FormData) {
  return FaqSchema.parse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    order: formData.get("order") ?? 0,
    published: formData.get("published") === "on",
  });
}

function revalidateAll() {
  revalidatePath("/admin/faqs");
  revalidatePath("/");
}

export async function createFaq(formData: FormData) {
  await verifySession();
  await prisma.faq.create({ data: parseForm(formData) });
  revalidateAll();
  redirect("/admin/faqs");
}

export async function updateFaq(id: string, formData: FormData) {
  await verifySession();
  await prisma.faq.update({ where: { id }, data: parseForm(formData) });
  revalidateAll();
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
  await verifySession();
  await prisma.faq.delete({ where: { id } });
  revalidateAll();
}
