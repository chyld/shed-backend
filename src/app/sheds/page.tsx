import styles from "./page.module.css";
import prisma from "@/lib/prisma";

export default async function ShedListPage() {
  const sheds = await prisma.shed.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className={styles.container}>
      <h1>Shed Inventory</h1>
      <div>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableRow}>
              <th className={styles.th}>Title</th>
              <th className={styles.th}>Inventory #</th>
              <th className={styles.th}>Size</th>
              <th className={styles.th}>Base Price</th>
              <th className={styles.th}>Options Price</th>
              <th className={styles.th}>Total Price</th>
              <th className={styles.th}>Sale %</th>
              <th className={styles.th}>Sale Price</th>
              <th className={styles.th}>Type</th>
              <th className={styles.th}>Colors</th>
            </tr>
          </thead>
          <tbody>
            {sheds.map((shed) => (
              <tr key={shed.id} className={styles.tableRow}>
                <td className={styles.td}>
                  {shed.title}
                  {shed.isNew && <span className={styles.newBadge}>New</span>}
                  {shed.isSold && <span className={styles.soldBadge}>Sold</span>}
                  <br />
                  <span className={styles.description}>{shed.description}</span>
                </td>
                <td className={styles.td}>{shed.inventoryNumber}</td>
                <td className={styles.td}>{`${shed.sizeWidth}x${shed.sizeLength}`}</td>
                <td className={`${styles.td} ${styles.priceCell}`}>${(shed.basePrice / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className={`${styles.td} ${styles.priceCell}`}>${(shed.optionsPrice / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className={`${styles.td} ${styles.priceCell}`}>${((shed.basePrice + shed.optionsPrice) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className={`${styles.td} ${styles.salePercentage}`}>{shed.salePercent}%</td>
                <td className={`${styles.td} ${styles.priceCell}`}>
                  ${(((shed.basePrice + shed.optionsPrice) * (100 - shed.salePercent)) / 100 / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className={styles.td}>{shed.shedType}</td>
                <td className={`${styles.td} ${styles.colorsCell}`}>
                  Roof: {shed.colorRoof}
                  <br />
                  Siding: {shed.colorSiding}
                  <br />
                  Trim: {shed.colorTrim}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
