import { getReferenceDoc } from "@/lib/mdx/content";
import { MDXContent } from "@/components/mdx/mdx-content";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { notFound } from "next/navigation";


export default async function ReferencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getReferenceDoc(slug);

  if (!doc) {
    notFound();
  }

  return (
    <>
      <Breadcrumb items={[
        { label: "Reference", href: "/reference" },
        { label: doc.title },
      ]} />
      <h1 className="text-3xl font-bold tracking-tight mb-8">{doc.title}</h1>
      <MDXContent source={doc.content} />
    </>
  );
}
