import { prisma } from "@/lib/prisma";

export async function getContentMap(keys: string[]) {
  const blocks = await prisma.contentBlock.findMany({ where: { key: { in: keys } } });
  const map = new Map(blocks.map((b) => [b.key, b.value]));
  return (key: string, fallback = "") => map.get(key) ?? fallback;
}

export async function getPublishedClasses() {
  return prisma.classItem.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: { teacher: true },
  });
}

export async function getClassBySlug(slug: string) {
  return prisma.classItem.findUnique({ where: { slug }, include: { teacher: true } });
}

export async function getPublishedServices() {
  return prisma.serviceItem.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: { teacher: true },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.serviceItem.findUnique({ where: { slug }, include: { teacher: true } });
}

export async function getPublishedTeachers() {
  return prisma.teacher.findMany({ where: { published: true }, orderBy: { order: "asc" } });
}

export async function getPublishedFaqs() {
  return prisma.faq.findMany({ where: { published: true }, orderBy: { order: "asc" } });
}
