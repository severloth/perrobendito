import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getOptionalSession } from "@/lib/dal";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_BYTES = 40 * 1024 * 1024;

// El archivo viaja del navegador a Blob directo, sin pasar por la funcion:
// asi no choca contra el limite de 4.5MB que Vercel impone al body.
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        // Solo un admin logueado puede pedir un token de subida.
        const session = await getOptionalSession();
        if (!session) {
          throw new Error("No autorizado");
        }

        const isVideo = clientPayload === "video";
        return {
          allowedContentTypes: isVideo ? VIDEO_TYPES : IMAGE_TYPES,
          maximumSizeInBytes: isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // Nada que hacer: la URL se guarda cuando se envia el formulario.
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al subir el archivo";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
