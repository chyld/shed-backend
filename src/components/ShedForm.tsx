"use client";

import { useState } from "react";
import styles from "./ShedForm.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface ShedFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    isNew: boolean;
    isSold: boolean;
    isDeleted: boolean;
    inventoryNumber: string;
    basePrice: number;
    optionsPrice: number;
    salePercent: number;
    sizeWidth: number;
    sizeLength: number;
    colorRoof: string;
    colorSiding: string;
    colorTrim: string;
    shedType: string;
  };
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function ShedForm({ initialData, onSubmit, isLoading }: ShedFormProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      isNew: initialData?.isNew ?? true,
      isSold: initialData?.isSold ?? false,
      isDeleted: initialData?.isDeleted ?? false,
      inventoryNumber: initialData?.inventoryNumber || "",
      basePrice: initialData ? (initialData.basePrice / 100).toFixed(2) : "",
      optionsPrice: initialData ? (initialData.optionsPrice / 100).toFixed(2) : "",
      salePercent: initialData?.salePercent || 0,
      sizeWidth: initialData?.sizeWidth || 0,
      sizeLength: initialData?.sizeLength || 0,
      colorRoof: initialData?.colorRoof || "",
      colorSiding: initialData?.colorSiding || "",
      colorTrim: initialData?.colorTrim || "",
      shedType: initialData?.shedType || "",
    },
  });

  const onSubmitForm = async (data: any) => {
    const formData = {
      ...data,
      basePrice: Math.round(parseFloat(data.basePrice) * 100),
      optionsPrice: Math.round(parseFloat(data.optionsPrice) * 100),
      salePercent: parseInt(data.salePercent),
      sizeWidth: parseInt(data.sizeWidth),
      sizeLength: parseInt(data.sizeLength),
    };
    await onSubmit(formData);
    router.push("/sheds");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmitForm)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title:</label>
        <input {...form.register("title", { required: true })} type="text" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description:</label>
        <textarea {...form.register("description", { required: true })} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="inventoryNumber">Inventory Number:</label>
        <input {...form.register("inventoryNumber", { required: true })} type="text" />
      </div>

      <div className={styles.checkboxGroup}>
        <label>
          <input type="checkbox" {...form.register("isNew")} />
          New Item
        </label>

        <label>
          <input type="checkbox" {...form.register("isSold")} />
          Sold
        </label>

        <label>
          <input type="checkbox" {...form.register("isDeleted")} />
          Deleted
        </label>
      </div>

      <div className={styles.priceGroup}>
        <div className={styles.formGroup}>
          <label htmlFor="basePrice">Base Price ($):</label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...form.register("basePrice", {
              required: "Base price is required",
              validate: (value: string) => {
                const num = parseFloat(value);
                if (isNaN(num)) return "Please enter a valid price";
                if (num < 0) return "Price cannot be negative";
                return true;
              },
            })}
            className="form-control"
          />
          {form.formState.errors.basePrice && <span className="error">{form.formState.errors.basePrice.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="optionsPrice">Options Price ($):</label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...form.register("optionsPrice", {
              required: "Options price is required",
              validate: (value: string) => {
                const num = parseFloat(value);
                if (isNaN(num)) return "Please enter a valid price";
                if (num < 0) return "Price cannot be negative";
                return true;
              },
            })}
            className="form-control"
          />
          {form.formState.errors.optionsPrice && <span className="error">{form.formState.errors.optionsPrice.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="salePercent">Sale Percentage (%):</label>
          <input type="number" min="0" max="100" {...form.register("salePercent", { required: true })} />
        </div>
      </div>

      <div className={styles.dimensions}>
        <div className={styles.formGroup}>
          <label htmlFor="sizeWidth">Width (ft):</label>
          <input {...form.register("sizeWidth", { required: true })} type="number" min="0" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sizeLength">Length (ft):</label>
          <input {...form.register("sizeLength", { required: true })} type="number" min="0" />
        </div>
      </div>

      <div className={styles.colorGroup}>
        <div className={styles.formGroup}>
          <label htmlFor="colorRoof">Roof Color:</label>
          <input {...form.register("colorRoof", { required: true })} type="text" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="colorSiding">Siding Color:</label>
          <input {...form.register("colorSiding", { required: true })} type="text" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="colorTrim">Trim Color:</label>
          <input {...form.register("colorTrim", { required: true })} type="text" />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="shedType">Shed Type:</label>
        <input {...form.register("shedType", { required: true })} type="text" />
      </div>

      <button type="submit" className={styles.submitButton} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Shed"}
      </button>
    </form>
  );
}
