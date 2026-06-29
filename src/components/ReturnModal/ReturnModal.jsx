import { useEffect, useState } from "react";
import "./ReturnModal.css";
import { createReturn } from "../../services/returnService";

function ReturnModal({
    open,
    onClose,
    invoice,
    token,
    onSuccess
}) {

    const [items, setItems] = useState([]);
    const [refundMethod, setRefundMethod] = useState("Cash");
    const [remarks, setRemarks] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (invoice) {

            setItems(
                invoice.items.map(item => ({
                    invoiceItemId: item._id,
                    product: item.product,
                    productName: item.productName,
                    soldQuantity: item.quantity,
                    returnedQuantity: 0,
                    available:
                        item.quantity -
                        item.returnedQuantity,
                    condition: "GOOD",
                    reason: ""
                }))
            );

        }

    }, [invoice]);

    if (!open) return null;

    const handleQty = (index, value) => {

        const updated = [...items];

        updated[index].returnedQuantity =
            Number(value);

        setItems(updated);

    };

    const handleCondition = (index, value) => {

        const updated = [...items];

        updated[index].condition = value;

        setItems(updated);

    };

    const handleReason = (index, value) => {

        const updated = [...items];

        updated[index].reason = value;

        setItems(updated);

    };

    const handleSubmit = async () => {

        try {

            setLoading(true);

            const payload = {

                invoiceId: invoice._id,

                refundMethod,

                returnType: "Refund",

                remarks,

                items: items.filter(
                    item =>
                        item.returnedQuantity > 0
                )

            };

            await createReturn(
                payload,
                token
            );

            alert("Return Created");

            onSuccess();

            onClose();

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                error.message
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="return-overlay">

            <div className="return-modal">

                <h2>

                    Returns & Refund

                </h2>

                {

                    items.map((item, index) => (

                        <div
                            key={item.invoiceItemId}
                            className="return-item"
                        >

                            <h4>

                                {item.productName}

                            </h4>

                            <p>

                                Sold :

                                {item.soldQuantity}

                            </p>

                            <p>

                                Available :

                                {item.available}

                            </p>

                            <input
                                type="number"
                                min="0"
                                max={item.available}
                                value={
                                    item.returnedQuantity
                                }
                                onChange={(e) =>
                                    handleQty(
                                        index,
                                        e.target.value
                                    )
                                }
                            />

                            <select
                                value={item.condition}
                                onChange={(e) =>
                                    handleCondition(
                                        index,
                                        e.target.value
                                    )
                                }
                            >

                                <option value="GOOD">

                                    GOOD

                                </option>

                                <option value="DAMAGED">

                                    DAMAGED

                                </option>

                            </select>

                            <textarea

                                placeholder="Reason"

                                value={item.reason}

                                onChange={(e) =>
                                    handleReason(
                                        index,
                                        e.target.value
                                    )
                                }

                            />

                        </div>

                    ))

                }

                <select
                    value={refundMethod}
                    onChange={(e) =>
                        setRefundMethod(
                            e.target.value
                        )
                    }
                >

                    <option>

                        Cash

                    </option>

                    <option>

                        UPI

                    </option>

                    <option>

                        Card

                    </option>

                    <option>

                        Bank

                    </option>

                </select>

                <textarea

                    placeholder="Remarks"

                    value={remarks}

                    onChange={(e) =>
                        setRemarks(
                            e.target.value
                        )
                    }

                />

                <div className="return-actions">

                    <button
                        onClick={onClose}
                    >

                        Cancel

                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                    >

                        {

                            loading

                                ?

                                "Saving..."

                                :

                                "Save Return"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ReturnModal;