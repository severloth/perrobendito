"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

export async function markAsRead(id: string) {
  await verifySession();
  await prisma.contactSubmission.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/mensajes");
}

export async function deleteSubmission(id: string) {
  await verifySession();
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/mensajes");
}
