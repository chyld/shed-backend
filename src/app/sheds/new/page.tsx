import ShedForm from "@/components/ShedForm";
import prisma from "@/lib/prisma";

export default function NewShedPage() {
  return (
    <div>
      <h1>Add New Shed</h1>
      <ShedForm
        onSubmit={async (data) => {
          "use server";
          await prisma.shed.create({
            data: data,
          });
        }}
      />
    </div>
  );
}
