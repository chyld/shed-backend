import styles from "./page.module.css";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";

interface PageProps {
  searchParams: Promise<{
    showSold?: string;
    width?: string;
    length?: string;
  }>;
}

export default async function TrailerListPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const showSold = resolvedParams.showSold === "true";
  const width = resolvedParams.width ? parseInt(resolvedParams.width) : undefined;
  const length = resolvedParams.length ? parseInt(resolvedParams.length) : undefined;

  const trailers = await prisma.trailer.findMany({
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
    orderBy: [{ isDeleted: "asc" }, { createdAt: "desc" }],
  });
  const session = await getServerSession();
  const isLoggedIn = !!session;

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
        <Link
          href="/trailers/new"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            display: "inline-block",
          }}
        >
          Create New Trailer
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
              href="/trailers"
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
            href={`/trailers?showSold=${!showSold}${width ? `&width=${width}` : ""}${length ? `&length=${length}` : ""}`}
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
      <h1>Trailer Inventory</h1>
      <div>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableRow}>
              <th className={styles.th}>Title</th>
              <th className={styles.th}>Model #</th>
              <th className={styles.th}>VIN</th>
              <th className={styles.th}>Plate #</th>
              <th className={styles.th}>Size</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Sale %</th>
              <th className={styles.th}>Sale Price</th>
              <th className={styles.th}>Type</th>
            </tr>
          </thead>
          <tbody>
            {trailers.map((trailer) => (
              <tr key={trailer.id} className={`${styles.tableRow} ${trailer.isDeleted ? styles.deletedRow : ""}`}>
                <td className={styles.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {trailer.media[0] && (
                      <div style={{ width: "50px", height: "50px", flexShrink: 0 }}>
                        {trailer.media[0].isPhoto ? (
                          <img
                            src={trailer.media[0].path}
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
                            src={trailer.media[0].path}
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
                          href={`/trailers/edit/${trailer.id}`}
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
                        href={`/trailers/media/${trailer.id}`}
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
                      {trailer.title}
                      {trailer.isNew && <span className={styles.newBadge}>New</span>}
                      {!trailer.isNew && <span className={styles.repoBadge}>Repo</span>}
                      {trailer.isSold && <span className={styles.soldBadge}>Sold</span>}
                    </div>
                  </div>
                  <br />
                  <span className={styles.description}>{trailer.description}</span>
                </td>
                <td className={styles.td}>{trailer.modelNumber}</td>
                <td className={styles.td}>{trailer.vin}</td>
                <td className={styles.td}>{trailer.plateNumber}</td>
                <td className={styles.td}>{`${trailer.sizeWidth}x${trailer.sizeLength}`}</td>
                <td className={`${styles.td} ${styles.priceCell}`}>${(trailer.price / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className={`${styles.td} ${styles.salePercentage}`}>{trailer.salePercent}%</td>
                <td className={`${styles.td} ${styles.priceCell}`}>
                  ${((trailer.price * (100 - trailer.salePercent)) / 100 / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className={styles.td}>{trailer.trailerType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
