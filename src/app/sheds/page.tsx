import styles from "./ShedList.module.css";
import prisma from "@/lib/prisma";

export default async function ShedListPage() {
  const sheds = await prisma.shed.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1>Shed Inventory</h1>
      <div>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Inventory #</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Size</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Base Price</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Options Price</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Total Price</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Sale %</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Sale Price</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Type</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Colors</th>
            </tr>
          </thead>
          <tbody>
            {sheds.map((shed) => (
              <tr key={shed.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {shed.title}
                  {shed.isNew && (
                    <span
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "0.8em",
                        marginLeft: "8px",
                      }}
                    >
                      New
                    </span>
                  )}
                  {shed.isSold && (
                    <span
                      style={{
                        backgroundColor: "#DC3545",
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "0.8em",
                        marginLeft: "8px",
                      }}
                    >
                      Sold
                    </span>
                  )}
                  <br />
                  <span style={{ fontSize: "0.9em", color: "#666" }}>{shed.description}</span>
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{shed.inventoryNumber}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{`${shed.sizeWidth}x${shed.sizeLength}`}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>${(shed.basePrice / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>${(shed.optionsPrice / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  ${((shed.basePrice + shed.optionsPrice) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{shed.salePercent}%</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  ${(((shed.basePrice + shed.optionsPrice) * (100 - shed.salePercent)) / 100 / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{shed.shedType}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
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
