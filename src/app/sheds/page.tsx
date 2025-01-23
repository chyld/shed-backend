import styles from "./page.module.css";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Image from "next/image";

interface PageProps {
  searchParams: Promise<{
    showSold?: string;
    width?: string;
    length?: string;
  }>;
}

export default async function ShedListPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const showSold = resolvedParams.showSold === "true";
  const width = resolvedParams.width ? parseInt(resolvedParams.width) : undefined;
  const length = resolvedParams.length ? parseInt(resolvedParams.length) : undefined;

  const sheds = await prisma.shed.findMany({
    where: {
      isSold: showSold ? undefined : false,
      ...((width || length) && {
        AND: [...(width ? [{ sizeWidth: width }] : []), ...(length ? [{ sizeLength: length }] : [])],
      }),
    },
    include: {
      media: {
        where: {
          isPrimary: true,
        },
      },
    },
    orderBy: [
      { isDeleted: "asc" }, // Show non-deleted sheds first
      { createdAt: "desc" }, // Then sort by creation date within each group
    ],
  });
  const session = await getServerSession();
  const isLoggedIn = !!session;

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
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

        <form style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label htmlFor="width">Width:</label>
            <input
              type="number"
              id="width"
              name="width"
              defaultValue={width}
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "70px",
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label htmlFor="length">Length:</label>
            <input
              type="number"
              id="length"
              name="length"
              defaultValue={length}
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "70px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "4px 12px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Search Size
          </button>

          {(width || length) && (
            <Link
              href="/sheds"
              style={{
                padding: "4px 12px",
                backgroundColor: "#f44336",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              Clear
            </Link>
          )}
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link
            href={`/sheds?showSold=${!showSold}${width ? `&width=${width}` : ""}${length ? `&length=${length}` : ""}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <input type="checkbox" checked={showSold} readOnly style={{ cursor: "pointer" }} />
            <span>Show Sold Items</span>
          </Link>
        </div>
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
                          <Image src={shed.media[0].path} alt="Primary media" width={500} height={300} />
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
                      {!shed.isNew && <span className={styles.repoBadge}>Repo</span>}
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
