import { notFound } from "next/navigation";
import { getServiceBySlug, getContentMap, getPublishedServices } from "@/lib/data";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { DetailPage } from "@/components/site/DetailPage";

export default async function ServicioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [item, allServices, content] = await Promise.all([
    getServiceBySlug(slug),
    getPublishedServices(),
    getContentMap(["contacto.whatsapp"]),
  ]);

  if (!item || !item.published) {
    notFound();
  }

  const whatsappNumber = content("contacto.whatsapp");
  const otherServices = allServices.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <DetailPage
      breadcrumbLabel="Marketing"
      breadcrumbHref="/marketing"
      kicker={item.kicker}
      title={item.title}
      slug={item.slug}
      photoUrl={item.photoUrl}
      description={item.description || "Descripción a definir por el equipo."}
      specs={[
        { label: "Alcance", value: item.scope },
        { label: "Duración", value: item.duration },
        { label: "Formato", value: item.format },
      ]}
      teacher={item.teacher ? { name: item.teacher.name, discipline: item.teacher.discipline, photoUrl: item.teacher.photoUrl } : null}
      teacherRoleLabel="A cargo"
      whatsappHref={buildWhatsAppLink(whatsappNumber, `Hola! Quiero consultar por el servicio de ${item.title}.`)}
      whatsappQuestion="¿Tenés dudas o querés contratar este servicio?"
      crossNavTitle="Otros servicios que te pueden interesar"
      crossNavItems={otherServices.map((s) => ({ title: s.title, href: `/marketing/${s.slug}` }))}
    />
  );
}
