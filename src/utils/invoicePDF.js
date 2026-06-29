import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/logo.png";
import signature from "../assets/signature.png";

export const downloadInvoicePDF = (invoice) => {

    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth =
        doc.internal.pageSize.getWidth();

    const pageHeight =
        doc.internal.pageSize.getHeight();

    // ===============================
    // COLORS
    // ===============================

    const BLUE = [37, 99, 235];
    const DARK = [31, 41, 55];
    const GRAY = [107, 114, 128];
    const GREEN = [22, 163, 74];

    // ===============================
    // HEADER
    // ===============================

    doc.setFillColor(...BLUE);

    doc.rect(
        0,
        0,
        pageWidth,
        32,
        "F"
    );

    // Company Logo

    doc.addImage(

        logo,

        "PNG",

        8,

        3,

        24,

        24

    );

    doc.setTextColor(255, 255, 255);

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(22);

    doc.text(
        invoice.shop.name,
        38,
        14
    );

    doc.setFontSize(10);

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.text(
        `${invoice.shop.address}, ${invoice.shop.city}, ${invoice.shop.state} - ${invoice.shop.pincode}`,
        38,
        20
    );

    doc.text(
        invoice.shop.phone || "-",
        38,
        25
    );

    doc.text(
        invoice.shop.email || "-",
        120,
        21
    );

    doc.text(
        `GST : ${invoice.shop.gst || "-"}`,
        120,
        26
    );

    // ===============================
    // TITLE
    // ===============================

    doc.setTextColor(...DARK);

    doc.setFontSize(20);

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.text(
        "TAX INVOICE",
        pageWidth / 2,
        45,
        {
            align: "center"
        }
    );

    // ===============================
    // INVOICE BOX
    // ===============================

    doc.setDrawColor(220);

    doc.roundedRect(
        130,
        55,
        65,
        38,
        2,
        2
    );

    doc.setFontSize(10);

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.text(
        "Invoice No",
        135,
        64
    );

    doc.text(
        "Date",
        135,
        73
    );

    doc.text(
        "Status",
        135,
        82
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.text(
        invoice.invoiceNumber,
        170,
        64
    );

    doc.text(
        new Date(
            invoice.invoiceDate
        ).toLocaleDateString(),
        170,
        73
    );

    doc.setTextColor(...GREEN);

    doc.text(
        "PAID",
        170,
        82
    );

    doc.setTextColor(...DARK);

    // ===============================
    // CUSTOMER BOX
    // ===============================

    doc.roundedRect(
        15,
        55,
        105,
        58,
        2,
        2
    );

    doc.setFontSize(12);

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.text(
        "Bill To",
        20,
        64
    );

    doc.setFontSize(10);

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.text(
        `Customer : ${invoice.customer.name}`,
        20,
        74
    );

    doc.text(
        `Phone : ${invoice.customer.phone || "-"}`,
        20,
        82
    );

    doc.text(
        `Email : ${invoice.customer.email || "-"}`,
        20,
        90
    );

    doc.text(
        `GST : ${invoice.customer.gstNumber || "-"}`,
        20,
        98
    );

    doc.text(
        `Address : ${invoice.customer.address || "-"}`,
        20,
        106
    );

    // ===============================
    // PRODUCT TABLE
    // ===============================

    autoTable(doc, {

        startY: 122,

        head: [[
            "S.No",
            "Product",
            "Qty",
            "Rate",
            "GST %",
            "Amount"
        ]],

        body: [[
            "1",
            invoice.product.name,
            invoice.product.quantity,
            `${invoice.shop.currency} ${invoice.product.price.toLocaleString()}`,
            `${invoice.product.gst}%`,
            `${invoice.shop.currency} ${invoice.subtotal.toLocaleString()}`
        ]],

        theme: "grid",

        styles: {

            font: "helvetica",

            fontSize: 10,

            cellPadding: 4,

            lineColor: [220, 220, 220],

            lineWidth: 0.2,

            valign: "middle"

        },

        headStyles: {

            fillColor: BLUE,

            textColor: 255,

            fontStyle: "bold",

            halign: "center"

        },

        columnStyles: {

            0: { halign: "center", cellWidth: 15 },

            2: { halign: "center", cellWidth: 20 },

            3: { halign: "right", cellWidth: 30 },

            4: { halign: "center", cellWidth: 22 },

            5: { halign: "right", cellWidth: 35 }

        }

    });

    let tableEnd =
        doc.lastAutoTable.finalY + 12;

    // ===============================
    // SUMMARY BOX
    // ===============================

    doc.roundedRect(

        120,

        tableEnd,

        75,

        42,

        2,

        2

    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(11);

    doc.text(
        "Sub Total",
        126,
        tableEnd + 10
    );

    doc.text(
        "GST",
        126,
        tableEnd + 20
    );

    doc.setFontSize(13);

    doc.text(
        "Grand Total",
        126,
        tableEnd + 33
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(11);

    doc.text(
        `${invoice.shop.currency} ${invoice.subtotal.toLocaleString()}`,
        188,
        tableEnd + 10,
        {
            align: "right"
        }
    );

    doc.text(
        `${invoice.shop.currency} ${invoice.gstAmount.toFixed(2)}`,
        188,
        tableEnd + 20,
        {
            align: "right"
        }
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setTextColor(...GREEN);

    doc.text(
        `${invoice.shop.currency} ${invoice.grandTotal.toFixed(2)}`,
        188,
        tableEnd + 33,
        {
            align: "right"
        }
    );

    doc.setTextColor(...DARK);

    // ===============================
    // TERMS
    // ===============================

    doc.setFontSize(11);

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.text(
        "Terms & Conditions",
        15,
        tableEnd + 12
    );

    doc.setFontSize(9);

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.text(
        invoice.shop.terms ||
        "Goods once sold will not be taken back.",
        15,
        tableEnd + 20
    );


    doc.setFontSize(10);

    doc.setFont("helvetica", "bold");

    doc.text(
        "Bank Details",
        15,
        pageHeight - 45
    );

    doc.setFont("helvetica", "normal");

    doc.text(
        `Bank : ${invoice.shop.bankName || "-"}`,
        15,
        pageHeight - 39
    );

    doc.text(
        `A/C : ${invoice.shop.accountNumber || "-"}`,
        15,
        pageHeight - 33
    );

    doc.text(
        `IFSC : ${invoice.shop.ifsc || "-"}`,
        15,
        pageHeight - 27
    );

    doc.text(
        `UPI : ${invoice.shop.upiId || "-"}`,
        15,
        pageHeight - 21
    );

    // ===============================
    // SIGNATURE
    // ===============================

    doc.addImage(

        signature,

        "PNG",

        145,

        pageHeight - 42,

        40,

        18

    );

    doc.line(

        145,

        pageHeight - 22,

        195,

        pageHeight - 22

    );

    doc.setFontSize(10);

    doc.text(

        "Authorized Signature",

        170,

        pageHeight - 16,

        { align: "center" }

    );

    // ===============================
    // FOOTER
    // ===============================

    doc.setDrawColor(...BLUE);

    doc.line(

        15,

        pageHeight - 15,

        pageWidth - 15,

        pageHeight - 15

    );

    doc.setFontSize(9);

    doc.setTextColor(...GRAY);

    doc.text(
        invoice.shop.footer ||
        "Thank you for your business.",
        15,
        pageHeight - 8
    );

    doc.text(

        `Generated on ${new Date().toLocaleString()}`,

        pageWidth - 15,

        pageHeight - 8,

        {

            align: "right"

        }

    );

    // ===============================
    // SAVE
    // ===============================

    doc.save(

        `${invoice.invoiceNumber}.pdf`

    );

};