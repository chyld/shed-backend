import prisma from "@/lib/prisma";
import ShedForm from "@/components/ShedForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditShedPage({ params }: PageProps) {
  const resolvedParams = await params;

  const shed = await prisma.shed.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!shed) {
    throw new Error("Shed not found");
  }

  // Map database fields to form fields
  const mappedShed = {
    id: shed.id,
    title: shed.title,
    description: shed.description,
    isNew: shed.isNew,
    isSold: shed.isSold,
    isDeleted: shed.isDeleted,
    inventoryNumber: shed.inventoryNumber,
    basePrice: shed.basePrice,
    optionsPrice: shed.optionsPrice,
    salePercent: shed.salePercent,
    sizeWidth: shed.sizeWidth,
    sizeLength: shed.sizeLength,
    colorRoof: shed.colorRoof,
    colorSiding: shed.colorSiding,
    colorTrim: shed.colorTrim,
    shedType: shed.shedType,
  };

  return (
    <div>
      <h1>Edit Shed</h1>
      <ShedForm
        initialData={mappedShed}
        onSubmit={async (data) => {
          "use server";
          await prisma.shed.update({
            where: { id: resolvedParams.id },
            data: {
              title: data.title,
              description: data.description,
              isNew: data.isNew,
              isSold: data.isSold,
              isDeleted: data.isDeleted,
              inventoryNumber: data.inventoryNumber,
              basePrice: data.basePrice,
              optionsPrice: data.optionsPrice,
              salePercent: data.salePercent,
              sizeWidth: data.sizeWidth,
              sizeLength: data.sizeLength,
              colorRoof: data.colorRoof,
              colorSiding: data.colorSiding,
              colorTrim: data.colorTrim,
              shedType: data.shedType,
            },
          });
        }}
      />
    </div>
  );
}
