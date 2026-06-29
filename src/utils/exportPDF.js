import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (
  title,
  columns,
  rows,
  fileName
) => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Hardware Shop ERP", 14, 18);

  doc.setFontSize(13);
  doc.text(title, 14, 28);

  doc.setFontSize(10);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    36
  );

  autoTable(doc, {

    head: [columns],

    body: rows,

    startY: 45,

    theme: "grid",

    headStyles: {

      fillColor: [37, 99, 235],

      textColor: 255,

      fontStyle: "bold"

    },

    styles: {

      fontSize: 10,

      cellPadding: 4

    }

  });

  const pageCount =
    doc.internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {

    doc.setPage(i);

    doc.setFontSize(9);

    doc.text(

      `Page ${i} of ${pageCount}`,

      180,

      290,

      { align: "right" }

    );

  }

  doc.save(`${fileName}.pdf`);

};