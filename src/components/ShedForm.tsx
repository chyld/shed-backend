"use client";

import { useState } from "react";
import styles from "./ShedForm.module.css";
import { useRouter } from "next/navigation";

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
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    isNew: initialData?.isNew ?? true,
    isSold: initialData?.isSold ?? false,
    isDeleted: initialData?.isDeleted ?? false,
    inventoryNumber: initialData?.inventoryNumber || "",
    basePrice: initialData?.basePrice || 0,
    optionsPrice: initialData?.optionsPrice || 0,
    salePercent: initialData?.salePercent || 0,
    sizeWidth: initialData?.sizeWidth || 0,
    sizeLength: initialData?.sizeLength || 0,
    colorRoof: initialData?.colorRoof || "",
    colorSiding: initialData?.colorSiding || "",
    colorTrim: initialData?.colorTrim || "",
    shedType: initialData?.shedType || "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit(formData);

      // After successful save, redirect to sheds list
      router.push("/sheds");
    } catch (error) {
      console.error("Error saving shed:", error);
      // ... error handling ...
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : ["basePrice", "optionsPrice", "salePercent", "sizeWidth", "sizeLength"].includes(name) ? parseInt(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="inventoryNumber">Inventory Number:</label>
        <input type="text" id="inventoryNumber" name="inventoryNumber" value={formData.inventoryNumber} onChange={handleChange} required />
      </div>

      <div className={styles.checkboxGroup}>
        <label>
          <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} />
          New Item
        </label>

        <label>
          <input type="checkbox" name="isSold" checked={formData.isSold} onChange={handleChange} />
          Sold
        </label>

        <label>
          <input type="checkbox" name="isDeleted" checked={formData.isDeleted} onChange={handleChange} />
          Deleted
        </label>
      </div>

      <div className={styles.priceGroup}>
        <div className={styles.formGroup}>
          <label htmlFor="basePrice">Base Price ($):</label>
          <input type="number" id="basePrice" name="basePrice" value={formData.basePrice} onChange={handleChange} min="0" required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="optionsPrice">Options Price ($):</label>
          <input type="number" id="optionsPrice" name="optionsPrice" value={formData.optionsPrice} onChange={handleChange} min="0" required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="salePercent">Sale Percentage (%):</label>
          <input type="number" id="salePercent" name="salePercent" value={formData.salePercent} onChange={handleChange} min="0" max="100" required />
        </div>
      </div>

      <div className={styles.dimensions}>
        <div className={styles.formGroup}>
          <label htmlFor="sizeWidth">Width (ft):</label>
          <input type="number" id="sizeWidth" name="sizeWidth" value={formData.sizeWidth} onChange={handleChange} min="0" required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sizeLength">Length (ft):</label>
          <input type="number" id="sizeLength" name="sizeLength" value={formData.sizeLength} onChange={handleChange} min="0" required />
        </div>
      </div>

      <div className={styles.colorGroup}>
        <div className={styles.formGroup}>
          <label htmlFor="colorRoof">Roof Color:</label>
          <input type="text" id="colorRoof" name="colorRoof" value={formData.colorRoof} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="colorSiding">Siding Color:</label>
          <input type="text" id="colorSiding" name="colorSiding" value={formData.colorSiding} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="colorTrim">Trim Color:</label>
          <input type="text" id="colorTrim" name="colorTrim" value={formData.colorTrim} onChange={handleChange} required />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="shedType">Shed Type:</label>
        <input type="text" id="shedType" name="shedType" value={formData.shedType} onChange={handleChange} required />
      </div>

      <button type="submit" className={styles.submitButton} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Shed"}
      </button>
    </form>
  );
}
