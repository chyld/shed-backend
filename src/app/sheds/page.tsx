import styles from "./page.module.css";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function ShedListPage() {
  const sheds = await prisma.shed.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      media: {
        where: {
          isPrimary: true,
        },
      },
    },
  });
  const session = await getServerSession();
  const isLoggedIn = !!session;

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: "20px" }}>
        <Link
          href="/sheds/new"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            display: "inline-block",
          }}
        >
          Create New Shed
        </Link>
      </div>
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
              <tr key={shed.id} className={`${styles.tableRow} ${shed.isDeleted ? styles.deletedRow : ""}`}>
                <td className={styles.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {shed.media[0] && (
                      <div style={{ width: "50px", height: "50px", flexShrink: 0 }}>
                        {shed.media[0].isPhoto ? (
                          <img
                            src={shed.media[0].path}
                            alt="Primary media"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          <video
                            src={shed.media[0].path}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        )}
                      </div>
                    )}
                    <div>
                      {isLoggedIn && (
                        <Link
                          href={`/sheds/edit/${shed.id}`}
                          style={{
                            padding: "2px 6px",
                            backgroundColor: "#2196F3",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "4px",
                            fontSize: "0.8em",
                          }}
                        >
                          Edit
                        </Link>
                      )}
                      <a
                        href={`/sheds/media/${shed.id}`}
                        style={{
                          padding: "2px 6px",
                          backgroundColor: "#007bff",
                          color: "white",
                          textDecoration: "none",
                          borderRadius: "4px",
                          fontSize: "0.8em",
                        }}
                      >
                        Media
                      </a>
                      {shed.title}
                      {shed.isNew && <span className={styles.newBadge}>New</span>}
                      {shed.isSold && <span className={styles.soldBadge}>Sold</span>}
                    </div>
                  </div>
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
