import prisma from "@/lib/prisma";
import TrailerForm from "@/components/TrailerForm";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTrailerPage({ params }: PageProps) {
  const { id } = await params;

  const trailer = await prisma.trailer.findUnique({
    where: { id },
  });

  if (!trailer) {
    notFound();
  }

  return (
    <div>
      <h1>Edit Trailer</h1>
      <TrailerForm
        trailer={trailer}
        onSubmit={async (data) => {
          "use server";
          await prisma.trailer.update({
            where: { id },
            data,
          });
          redirect("/trailers");
        }}
      />
    </div>
  );
}
