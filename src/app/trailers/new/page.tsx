import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import TrailerForm from "@/components/TrailerForm";
import { getServerSession } from "next-auth";
import styles from "../page.module.css";
import { Trailer } from "@prisma/client";

export default async function NewTrailerPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  async function createTrailer(data: Partial<Trailer>): Promise<void> {
    "use server";

    await prisma.trailer.create({
      data: {
        title: data.title!,
        description: data.description!,
        modelNumber: data.modelNumber!,
        vin: data.vin!,
        plateNumber: data.plateNumber!,
        sizeWidth: data.sizeWidth!,
        sizeLength: data.sizeLength!,
        price: data.price!,
        salePercent: data.salePercent ?? 0,
        isNew: data.isNew ?? true,
        isSold: data.isSold ?? false,
        isDeleted: data.isDeleted ?? false,
        trailerType: data.trailerType!,
      },
    });
  }

  return (
    <div className={styles.container}>
      <h1>Create New Trailer</h1>
      <TrailerForm onSubmit={createTrailer} />
    </div>
  );
}
