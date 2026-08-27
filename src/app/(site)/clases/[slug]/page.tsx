import { notFound } from "next/navigation";
import { getClassBySlug, getContentMap, getPublishedClasses } from "@/lib/data";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { DetailPage } from "@/components/site/DetailPage";

export default async function ClaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [item, allClasses, content] = await Promise.all([
    getClassBySlug(slug),
    getPublishedClasses(),
    getContentMap(["contacto.whatsapp"]),
  ]);

  if (!item || !item.published) {
    notFound();
  }

  const whatsappNumber = content("contacto.whatsapp");
  const otherClasses = allClasses.filter((c) => c.slug !== slug).slice(0, 4);

  return (
    <DetailPage
      breadcrumbLabel="Clases"
      breadcrumbHref="/clases"
      kicker={item.kicker}
      title={item.title}
      slug={item.slug}
      photoUrl={item.photoUrl}
      description={item.description || "Descripción a definir por el equipo."}
      specs={[
        { label: "Nivel", value: item.level },
        { label: "Duración", value: item.duration },
        { label: "Modalidad", value: item.modality },
      ]}
      teacher={item.teacher ? { name: item.teacher.name, discipline: item.teacher.discipline, photoUrl: item.teacher.photoUrl } : null}
      teacherRoleLabel="Docente"
      whatsappHref={buildWhatsAppLink(whatsappNumber, `Hola! Quiero consultar por la clase de ${item.title}.`)}
      whatsappQuestion="¿Tenés dudas o querés anotarte?"
      crossNavTitle="Otras clases que te pueden interesar"
      crossNavItems={otherClasses.map((c) => ({ title: c.title, href: `/clases/${c.slug}` }))}
    />
  );
}
