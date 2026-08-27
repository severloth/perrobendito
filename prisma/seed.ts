import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const defaultContentBlocks: { key: string; label: string; value: string }[] = [
  { key: "home.hero.kicker", label: "Home / Hero / Antetítulo", value: "Estudio creativo · Academia musical" },
  { key: "home.hero.title", label: "Home / Hero / Título", value: "Perro Bendito Estudio" },
  { key: "home.hero.subtitle", label: "Home / Hero / Bajada", value: "Tu escena empieza acá." },
  {
    key: "home.hero.video",
    label: "Home / Hero / Video de fondo",
    value: "https://videos.pexels.com/video-files/8198249/8198249-hd_1920_1080_30fps.mp4",
  },
  { key: "home.paravos.title", label: "Home / Para vos si / Título", value: "Perro Bendito es para vos si:" },
  {
    key: "home.paravos.intro",
    label: "Home / Para vos si / Intro",
    value: "No necesitás experiencia previa. Tenemos espacio para todos los niveles.",
  },
  { key: "home.paravos.item1", label: "Home / Para vos si / Ítem 1", value: "Tenés algo que expresar y todavía no encontraste cómo hacerlo." },
  { key: "home.paravos.item2", label: "Home / Para vos si / Ítem 2", value: "Querés aprender música de alguien que vive de lo que enseña." },
  { key: "home.paravos.item3", label: "Home / Para vos si / Ítem 3", value: "Tu proyecto necesita identidad y presencia real, no solo publicaciones." },
  { key: "home.about.title", label: "Home / Quiénes somos / Título", value: "Un lugar donde el arte emerge y tiene con qué sostenerse." },
  {
    key: "home.about.text",
    label: "Home / Quiénes somos / Texto",
    value:
      "Somos un estudio creativo y academia musical en San Miguel. Formamos artistas, construimos identidades y desarrollamos estrategias para proyectos con algo genuino para decir.\n\nAprendés a tocar, a mezclar, a comunicar, a mostrarte. Tu proyecto encuentra la identidad para salir al mundo.",
  },
  {
    key: "home.clases.image",
    label: "Home / Tarjeta Clases / Imagen",
    value: "https://images.pexels.com/photos/7088373/pexels-photo-7088373.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  { key: "home.clases.title", label: "Home / Tarjeta Clases / Título", value: "Clases" },
  {
    key: "home.clases.text",
    label: "Home / Tarjeta Clases / Texto",
    value: "Grupos reducidos, docentes que hacen lo que enseñan. Desde cero hasta nivel avanzado.",
  },
  {
    key: "home.marketing.image",
    label: "Home / Tarjeta Marketing / Imagen",
    value: "https://images.pexels.com/photos/7688439/pexels-photo-7688439.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  { key: "home.marketing.title", label: "Home / Tarjeta Marketing / Título", value: "Marketing & Identidad" },
  {
    key: "home.marketing.text",
    label: "Home / Tarjeta Marketing / Texto",
    value: "Para artistas y proyectos que necesitan presencia, no solo presupuesto.",
  },
  {
    key: "home.about.image",
    label: "Home / Quiénes somos / Imagen",
    value: "https://images.pexels.com/photos/8827042/pexels-photo-8827042.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  { key: "home.closing.title", label: "Home / Cierre / Título", value: "Formamos artistas. Construimos presencias." },
  { key: "home.closing.subtitle", label: "Home / Cierre / Bajada", value: "Perro Bendito Estudio · San Miguel, Buenos Aires · Tu escena empieza acá." },
  { key: "clases.hero.title", label: "Clases / Hero / Título", value: "Clases" },
  { key: "clases.hero.subtitle", label: "Clases / Hero / Bajada", value: "El primer paso de cualquier artista es animarse a aprender." },
  {
    key: "clases.hero.text",
    label: "Clases / Hero / Texto",
    value: "Grupos reducidos, docentes que hacen lo que enseñan. Desde cero hasta nivel avanzado.",
  },
  { key: "marketing.hero.title", label: "Marketing / Hero / Título", value: "Marketing & Identidad" },
  { key: "marketing.hero.subtitle", label: "Marketing / Hero / Bajada", value: "Para artistas y proyectos que necesitan presencia, no solo presupuesto." },
  {
    key: "marketing.hero.text",
    label: "Marketing / Hero / Texto",
    value: "Estrategia, contenido y diseño para quienes tienen algo genuino para mostrar.",
  },
  { key: "quienes.hero.title", label: "Quiénes somos / Hero / Título", value: "Un lugar donde el arte emerge y tiene con qué sostenerse." },
  { key: "quienes.hero.subtitle", label: "Quiénes somos / Hero / Bajada", value: "El arte y la identidad se construyen juntos." },
  {
    key: "quienes.presentacion.title",
    label: "Quiénes somos / Presentación / Título",
    value: "Un grupo de amigos, cada uno bueno en lo suyo.",
  },
  {
    key: "quienes.presentacion.text",
    label: "Quiénes somos / Presentación / Texto",
    value:
      "Somos un grupo de amigos que respira música e inquietudes creativas. Con el tiempo entendimos que darle identidad a esta forma de vivir podía ser una aventura transformadora. Dicen que la unión hace la fuerza, y por eso decidimos potenciar cada faceta personal en un proyecto sólido y genuino. Hoy somos eso: artistas que tocan, que diseñan, que piensan estrategias, que escriben, que están en todos los detalles. No nos separan los roles, sino que se completan en el juego.",
  },
  {
    key: "quienes.origen.text",
    label: "Quiénes somos / Origen del nombre",
    value: "El nombre nace de una canción y de una idea: que después de la explosión, queda algo que vale. Eso es lo que buscamos construir acá.",
  },
  { key: "quienes.concepto.hacemos", label: "Quiénes somos / Concepto / Lo que hacemos", value: "Música, identidad y estrategia" },
  { key: "quienes.concepto.donde", label: "Quiénes somos / Concepto / Dónde estamos", value: "San Miguel, Buenos Aires" },
  { key: "quienes.concepto.aquien", label: "Quiénes somos / Concepto / A quién hablamos", value: "Artistas y proyectos con algo para decir" },
  { key: "contacto.hero.title", label: "Contacto / Hero / Título", value: "Contacto" },
  { key: "contacto.hero.subtitle", label: "Contacto / Hero / Bajada", value: "Tu escena empieza con un mensaje." },
  {
    key: "contacto.hero.text",
    label: "Contacto / Hero / Texto",
    value: "Contanos en qué andás. Sea una clase, un proyecto, o todavía no sabés bien qué necesitás.",
  },
  { key: "contacto.zona", label: "Contacto / Zona", value: "San Miguel, Buenos Aires" },
  { key: "contacto.instagram", label: "Contacto / Instagram", value: "@perrobenditoestudio" },
  { key: "contacto.email", label: "Contacto / Email", value: "hola@perrobenditoestudio.com" },
  { key: "contacto.whatsapp", label: "Contacto / WhatsApp (solo número, ej 5491122334455)", value: "5491100000000" },
];

const defaultFaqs = [
  {
    question: "¿Necesito experiencia previa para las clases?",
    answer: "No. Tenemos niveles para todos, desde principiantes hasta quienes quieren perfeccionar su técnica.",
    order: 1,
  },
  { question: "¿Cómo funciona el servicio de marketing?", answer: "Pendiente de definir por el equipo.", order: 2 },
  { question: "¿Trabajan con artistas independientes o también con marcas?", answer: "Pendiente de definir por el equipo.", order: 3 },
  { question: "¿Dónde están ubicados?", answer: "En San Miguel, Buenos Aires.", order: 4 },
];

function pexelsPhoto(id: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
}

const defaultClasses = [
  { title: "DJ", slug: "dj", order: 1, photoUrl: pexelsPhoto(9271241) },
  { title: "Producción musical", slug: "produccion-musical", order: 2, photoUrl: pexelsPhoto(8132964) },
  { title: "Guitarra", slug: "guitarra", order: 3, photoUrl: pexelsPhoto(435840) },
  { title: "Canto", slug: "canto", order: 4, photoUrl: pexelsPhoto(7087169) },
  { title: "Batería", slug: "bateria", order: 5, photoUrl: pexelsPhoto(5045874) },
  { title: "Alquiler de espacio", slug: "alquiler-de-espacio", kicker: "Servicio", order: 6, photoUrl: pexelsPhoto(4988137) },
];

const defaultServices = [
  { title: "Estrategia de marketing", slug: "estrategia-de-marketing", order: 1, photoUrl: pexelsPhoto(7710077) },
  { title: "Identidad visual", slug: "identidad-visual", order: 2, photoUrl: pexelsPhoto(4968725) },
  { title: "Diseño gráfico", slug: "diseno-grafico", order: 3, photoUrl: pexelsPhoto(13451104) },
  { title: "Creación de contenido", slug: "creacion-de-contenido", order: 4, photoUrl: pexelsPhoto(7480538) },
  { title: "Community manager", slug: "community-manager", order: 5, photoUrl: pexelsPhoto(18610082) },
  { title: "Estrategia en redes", slug: "estrategia-en-redes", order: 6, photoUrl: pexelsPhoto(17514176) },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@perrobendito.com";
  const password = process.env.ADMIN_PASSWORD ?? "cambiar123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, name: "Admin", passwordHash },
  });

  for (const block of defaultContentBlocks) {
    await prisma.contentBlock.upsert({
      where: { key: block.key },
      update: {},
      create: block,
    });
  }

  for (const faq of defaultFaqs) {
    const existing = await prisma.faq.findFirst({ where: { question: faq.question } });
    if (!existing) await prisma.faq.create({ data: faq });
  }

  for (const c of defaultClasses) {
    await prisma.classItem.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        title: c.title,
        slug: c.slug,
        kicker: c.kicker ?? "Clase",
        order: c.order,
        photoUrl: c.photoUrl,
        summary: `Grupos reducidos, docentes que hacen lo que enseñan.`,
        description: `[Descripción de la clase de ${c.title}: qué se aprende, a quién está dirigida, qué se lleva el alumno al terminar.]`,
      },
    });
  }

  for (const s of defaultServices) {
    await prisma.serviceItem.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        title: s.title,
        slug: s.slug,
        order: s.order,
        photoUrl: s.photoUrl,
        summary: `Servicio de ${s.title.toLowerCase()} para proyectos con identidad propia.`,
        description: `[Descripción del servicio de ${s.title}: en qué consiste, para qué tipo de proyecto aplica, qué obtiene el cliente al final.]`,
      },
    });
  }

  console.log(`Seed OK. Admin: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
