"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";

export function EditableMedia({
  name,
  currentSrc,
  kind,
  className = "",
  emptyLabel = "Sin imagen — hacé click para subir",
}: {
  name: string;
  currentSrc: string;
  kind: "image" | "video";
  className?: string;
  emptyLabel?: string;
}) {
  const [src, setSrc] = useState(currentSrc);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputId = `media-${name}`;

  // Se envia la URL ya subida a Blob; "" significa "quitar este medio".
  const changed = src !== currentSrc;

  async function onPick(file: File) {
    setUploading(true);
    setError("");
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
        clientPayload: kind,
      });
      setSrc(blob.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo subir el archivo");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={`group relative overflow-hidden bg-zinc-900 ${className}`}>
      {src ? (
        kind === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <video src={src} className="absolute inset-0 h-full w-full object-cover" muted autoPlay loop playsInline />
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(45deg,#27272a,#27272a_10px,#18181b_10px,#18181b_20px)] px-4 text-center text-xs text-white/50">
          {emptyLabel}
        </div>
      )}

      <label
        htmlFor={inputId}
        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 text-sm font-medium text-white opacity-0 transition-all duration-200 hover:bg-black/50 hover:opacity-100"
      >
        {uploading ? "Subiendo…" : `Cambiar ${kind === "image" ? "imagen" : "video"}`}
      </label>
      <input
        id={inputId}
        type="file"
        accept={kind === "image" ? "image/*" : "video/mp4,video/webm"}
        className="hidden"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPick(file);
        }}
      />

      {changed && <input type="hidden" name={name} value={src} />}

      {src && (
        <button
          type="button"
          onClick={() => setSrc("")}
          className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-black/80"
        >
          Quitar
        </button>
      )}

      {uploading && (
        <div className="absolute inset-x-0 bottom-0 bg-black/70 px-3 py-1.5 text-center text-xs text-white">
          Subiendo…
        </div>
      )}
      {error && (
        <div className="absolute inset-x-0 bottom-0 bg-red-600/90 px-3 py-1.5 text-center text-xs text-white">
          {error}
        </div>
      )}
    </div>
  );
}
