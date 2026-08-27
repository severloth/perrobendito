"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

export async function updatePage(formData: FormData) {
  await verifySession();

  const updates = new Map<string, string>();

  for (const [name, value] of formData.entries()) {
    if (name.startsWith("block:") && typeof value === "string") {
      updates.set(name.slice("block:".length), value);
    }
  }

  // Los medios se suben a Blob desde el navegador; aca llega la URL ya lista.
  // El campo solo se envia si cambio, y "" significa "quitar el medio".
  for (const [name, value] of formData.entries()) {
    if (name.startsWith("media:") && typeof value === "string") {
      updates.set(name.slice("media:".length), value);
    }
  }

  await Promise.all(
    [...updates.entries()].map(([key, value]) =>
      prisma.contentBlock.upsert({
        where: { key },
        update: { value },
        create: { key, label: key, value },
      }),
    ),
  );

  const redirectTo = formData.get("redirect_to");
  const target = typeof redirectTo === "string" && redirectTo ? redirectTo : "/admin/personalizar";

  revalidatePath("/", "layout");
  redirect(`${target}?saved=1`);
}
