"use client";

import { Trailer } from "@prisma/client";
import { useForm } from "react-hook-form";
import styles from "./TrailerForm.module.css";
import { useRouter } from "next/navigation";

interface TrailerFormProps {
  trailer?: Trailer;
  onSubmit: (data: Partial<Trailer>) => Promise<void>;
}

export default function TrailerForm({ trailer, onSubmit }: TrailerFormProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: trailer?.title || "",
      description: trailer?.description || "",
      modelNumber: trailer?.modelNumber || "",
      vin: trailer?.vin || "",
      plateNumber: trailer?.plateNumber || "",
      sizeWidth: trailer?.sizeWidth || 0,
      sizeLength: trailer?.sizeLength || 0,
      price: trailer ? (trailer.price / 100).toFixed(2) : "",
      salePercent: trailer?.salePercent || 0,
      isNew: trailer?.isNew ?? true,
      isSold: trailer?.isSold ?? false,
      isDeleted: trailer?.isDeleted ?? false,
      trailerType: trailer?.trailerType || "",
    },
  });

  const onSubmitForm = async (data: any) => {
    try {
      const formData = {
        ...data,
        price: Math.round(parseFloat(data.price) * 100),
        salePercent: parseInt(data.salePercent) || 0,
        sizeWidth: parseInt(data.sizeWidth) || 0,
        sizeLength: parseInt(data.sizeLength) || 0,
        title: data.title || "",
        description: data.description || "",
        modelNumber: data.modelNumber || "",
        vin: data.vin || "",
        plateNumber: data.plateNumber || "",
        trailerType: data.trailerType || "",
        isNew: Boolean(data.isNew),
        isSold: Boolean(data.isSold),
        isDeleted: Boolean(data.isDeleted),
      };

      await onSubmit(formData);
      router.push("/trailers");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmitForm)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title:</label>
        <input {...form.register("title", { required: true })} type="text" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description:</label>
        <textarea {...form.register("description")} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="modelNumber">Model Number:</label>
        <input {...form.register("modelNumber")} type="text" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="vin">VIN:</label>
        <input {...form.register("vin")} type="text" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="plateNumber">Plate Number:</label>
        <input {...form.register("plateNumber")} type="text" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price">Price ($):</label>
        <input
          type="number"
          step="0.01"
          min="0"
          {...form.register("price", {
            required: "Price is required",
            validate: (value: string) => {
              const num = parseFloat(value);
              if (isNaN(num)) return "Please enter a valid price";
              if (num < 0) return "Price cannot be negative";
              return true;
            },
          })}
        />
        {form.formState.errors.price && <span className="error">{form.formState.errors.price.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="salePercent">Sale Percentage:</label>
        <input type="number" min="0" max="100" {...form.register("salePercent")} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="sizeWidth">Width:</label>
        <input {...form.register("sizeWidth", { required: true })} type="number" min="0" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="sizeLength">Length:</label>
        <input {...form.register("sizeLength", { required: true })} type="number" min="0" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="trailerType">Type:</label>
        <input {...form.register("trailerType", { required: true })} type="text" />
      </div>

      <div className={styles.checkboxGroup}>
        <label>
          <input type="checkbox" {...form.register("isNew")} />
          New
        </label>
      </div>

      <div className={styles.checkboxGroup}>
        <label>
          <input type="checkbox" {...form.register("isSold")} />
          Sold
        </label>
      </div>

      <div className={styles.checkboxGroup}>
        <label>
          <input type="checkbox" {...form.register("isDeleted")} />
          Deleted
        </label>
      </div>

      <button type="submit" className={styles.submitButton}>
        {trailer ? "Update Trailer" : "Create Trailer"}
      </button>
    </form>
  );
}
