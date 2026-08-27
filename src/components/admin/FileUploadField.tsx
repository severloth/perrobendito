"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

type Status = "idle" | "uploading" | "done" | "error";

export function FileUploadField({
  name,
  kind = "image",
  currentUrl = "",
}: {
  /** Nombre del campo oculto que recibe la URL final (ej. "photoUrl"). */
  name: string;
  kind?: "image" | "video";
  currentUrl?: string;
}) {
  const [url, setUrl] = useState(currentUrl);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function onPick(file: File) {
    setStatus("uploading");
    setError("");
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
        clientPayload: kind,
      });
      setUrl(blob.url);
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "No se pudo subir el archivo");
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Lo que realmente viaja en el submit es la URL, no el archivo. */}
      <input type="hidden" name={name} value={url} />

      {url && (
        <div className="flex items-center gap-3">
          {kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="h-20 w-20 rounded object-cover" />
          ) : (
            <video src={url} className="h-20 w-32 rounded object-cover" muted playsInline />
          )}
          <button
            type="button"
            onClick={() => {
              setUrl("");
              setStatus("idle");
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="text-xs text-red-600 hover:underline"
          >
            Quitar
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={kind === "image" ? "image/*" : "video/mp4,video/webm"}
        disabled={status === "uploading"}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPick(file);
        }}
        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-zinc-900 file:px-3 file:py-1.5 file:text-xs file:text-white disabled:opacity-60"
      />

      {status === "uploading" && <p className="text-xs text-zinc-500">Subiendo…</p>}
      {status === "done" && <p className="text-xs text-green-600">Archivo subido.</p>}
      {status === "error" && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
