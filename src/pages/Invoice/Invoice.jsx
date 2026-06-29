import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoice } from "../../services/invoiceService";
import "./Invoice.css";
import { downloadInvoicePDF } from "../../utils/invoicePDF";

function Invoice() {

    const { saleId } = useParams();

    const [invoice, setInvoice] = useState(null);

    const token =
        localStorage.getItem("token");

    useEffect(() => {

        loadInvoice();

    }, []);

    const loadInvoice =
        async () => {

            try {

                const data =
                    await getInvoice(
                        saleId,
                        token
                    );

                setInvoice(
                    data.invoice
                );

            } catch (error) {

                console.log(error);

            }

        };

    if (!invoice)
        return <h2>Loading Invoice...</h2>;

    return (

        <div className="invoice-page">

            <div className="invoice-container">

                {/* Header */}

                <div className="invoice-header">

                    <div>

                        <h1>

                            {invoice.shop.name}

                        </h1>

                        <p>{invoice.shop.address}</p>

                        <p>{invoice.shop.phone}</p>

                        <p>{invoice.shop.email}</p>

                        <p>

                            GST :
                            {invoice.shop.gst}

                        </p>

                    </div>

                    <div className="invoice-title">

                        <h2>TAX INVOICE</h2>

                        <p>

                            Invoice :
                            {invoice.invoiceNumber}

                        </p>

                        <p>

                            Date :

                            {new Date(
                                invoice.invoiceDate
                            ).toLocaleDateString()}

                        </p>

                    </div>

                </div>

                {/* Customer */}

                <div className="customer-box">

                    <h3>Bill To</h3>

                    <p>

                        <strong>Name :</strong>

                        {invoice.customer.name}

                    </p>

                    <p>

                        <strong>Phone :</strong>

                        {invoice.customer.phone || "-"}

                    </p>

                    <p>

                        <strong>Email :</strong>

                        {invoice.customer.email || "-"}

                    </p>

                    <p>

                        <strong>GST :</strong>

                        {invoice.customer.gstNumber || "-"}

                    </p>

                    <p>

                        <strong>Address :</strong>

                        {invoice.customer.address || "-"}

                    </p>

                </div>

                {/* Table */}

                <table className="invoice-table">

                    <thead>

                        <tr>

                            <th>Product</th>

                            <th>Qty</th>

                            <th>Price</th>

                            <th>GST</th>

                            <th>Total</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>

                                {invoice.product.name}

                            </td>

                            <td>

                                {invoice.product.quantity}

                            </td>

                            <td>

                                ₹{invoice.product.price}

                            </td>

                            <td>

                                {invoice.product.gst}%

                            </td>

                            <td>

                                ₹{invoice.subtotal}

                            </td>

                        </tr>

                    </tbody>

                </table>

                {/* Summary */}

                <div className="invoice-summary">

                    <div>

                        <h3>

                            Sub Total

                        </h3>

                        <span>

                            ₹{invoice.subtotal}

                        </span>

                    </div>

                    <div>

                        <h3>

                            GST

                        </h3>

                        <span>

                            ₹{invoice.gstAmount.toFixed(2)}

                        </span>

                    </div>

                    <div>

                        <h2>

                            Grand Total

                        </h2>

                        <span className="grand">

                            ₹{invoice.grandTotal.toFixed(2)}

                        </span>

                    </div>

                </div>

                {/* Footer */}

                <div className="invoice-footer">

                    <div>

                        Thank You For Your Business.

                    </div>

                    <div>

                        Authorized Signature

                    </div>

                </div>

                {/* Buttons */}

                <div className="invoice-actions">

                    <button
                        onClick={() =>
                            window.print()
                        }
                    >
                        🖨 Print Invoice
                    </button>

                    <button
                        onClick={() =>
                            downloadInvoicePDF(invoice)
                        }
                    >

                        📄 Download PDF

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Invoice;