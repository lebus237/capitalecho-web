import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EditionView from "@/components/EditionView";
import { getEdition } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ entry?: string; format?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const e = getEdition(id);
  if (!e) return {};
  return { title: e.title, description: e.summary, openGraph: { title: e.title, description: e.summary, type: "article" } };
}

export default async function EditionPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { entry, format } = await searchParams;
  const edition = getEdition(id);
  if (!edition) notFound();
  const fmt = format === "videos" || format === "shorts" ? format : "articles";
  return <EditionView edition={edition} initialEntry={entry} initialFormat={fmt} />;
}
