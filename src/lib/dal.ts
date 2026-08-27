import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { decrypt, getSessionCookieValue } from "@/lib/session";

export const verifySession = cache(async () => {
  const cookieValue = await getSessionCookieValue();
  const session = await decrypt(cookieValue);

  if (!session?.userId) {
    redirect("/admin/login");
  }

  return { isAuth: true, userId: session.userId, email: session.email };
});

export const getOptionalSession = cache(async () => {
  const cookieValue = await getSessionCookieValue();
  const session = await decrypt(cookieValue);
  if (!session?.userId) return null;
  return { userId: session.userId, email: session.email };
});
