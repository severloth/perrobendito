"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const ContactSchema = z.object({
  name: z.string().min(2, "Ingresá tu nombre."),
  contact: z.string().min(3, "Ingresá un email o teléfono."),
  reason: z.enum(["Clases", "Marketing", "Otro"], { error: "Elegí un motivo." }),
  detail: z.string().optional().default(""),
  message: z.string().min(5, "Contanos un poco más."),
});

export type ContactState =
  | {
      errors?: Partial<Record<"name" | "contact" | "reason" | "message", string>>;
      success?: boolean;
    }
  | undefined;

export async function submitContact(_state: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    contact: formData.get("contact"),
    reason: formData.get("reason"),
    detail: formData.get("detail") ?? "",
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      errors: {
        name: fieldErrors.name?.[0],
        contact: fieldErrors.contact?.[0],
        reason: fieldErrors.reason?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  await prisma.contactSubmission.create({ data: parsed.data });

  return { success: true };
}
