"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = undefined;

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <form action={action} className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-lg font-semibold">Perro Bendito · Admin</h1>
        <p className="mt-1 text-sm text-zinc-500">Ingresá para editar el contenido del sitio.</p>

        <div className="mt-6">
          <label htmlFor="email" className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-900"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-900"
          />
        </div>

        {state?.error && <p className="mt-3 text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-60"
        >
          {pending ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
