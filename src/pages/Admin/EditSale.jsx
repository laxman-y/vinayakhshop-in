import {

    useEffect,

    useState

} from "react";

import {

    useNavigate,

    useParams

} from "react-router-dom";

import axios from "axios";

import {

    getSaleById,

    updateSale

} from "../../services/saleService";

import "./Sales.css";

function EditSale() {

    const { id } = useParams();

    const navigate = useNavigate();

    const token =

        localStorage.getItem("token");

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        products,

        setProducts

    ] = useState([]);

    const [

        customers,

        setCustomers

    ] = useState([]);

    const [

        formData,

        setFormData

    ] = useState({

        product: "",

        customer: "",

        customerName: "",

        quantity: 1,

        discount: 0,

        gst: 18,

        paymentMethod: "Cash",

        paymentStatus: "Paid",

        invoiceNumber: "",

        remarks: ""

    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const [

                saleRes,

                productRes,

                customerRes

            ] = await Promise.all([

                getSaleById(

                    id,

                    token

                ),

                axios.get(
                    "http://localhost:5000/api/products?page=1&limit=500",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                ),

                axios.get(
                    "http://localhost:5000/api/customers",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
            ]);

            const sale =

                saleRes.sale;

            setProducts(

                productRes.data.products

            );

            setCustomers(

                customerRes.data.customers

            );

            setFormData({

                product:

                    sale.product?._id ||

                    "",

                customer:

                    sale.customer?._id ||

                    "",

                customerName:

                    sale.customerName ||

                    "",

                quantity:

                    sale.quantity,

                discount:

                    sale.discount,

                gst:

                    sale.gst,

                paymentMethod:

                    sale.paymentMethod,

                paymentStatus:

                    sale.paymentStatus,

                invoiceNumber:

                    sale.invoiceNumber,

                remarks:

                    sale.remarks

            });

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:

                e.target.value

        });

    };

    const selectedProduct =

        products.find(

            item =>

                item._id ===

                formData.product

        );

    const total =

        (

            Number(

                formData.quantity || 0

            )

            *

            Number(

                selectedProduct?.sellingPrice || 0

            )

            -

            Number(

                formData.discount || 0

            )

        )

        *

        (

            1 +

            Number(

                formData.gst || 0

            ) / 100

        );

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateSale(

                id,

                formData,

                token

            );

            navigate(

                "/admin/sales"

            );

        }

        catch (error) {

            console.log(error);

        }

    };

    if (loading) {

        return (

            <div className="sales-page">

                <h2>

                    Loading Sale...

                </h2>

            </div>

        );

    }

    return (

        <div className="sales-page">

            <div className="sales-header">

                <div>

                    <span className="page-tag">

                        SALES MANAGEMENT

                    </span>

                    <h1>

                        Edit Sale

                    </h1>

                    <p>

                        Update sale information.
                        Stock and profit will
                        automatically synchronize.

                    </p>

                </div>

            </div>

            <div className="sales-form-card">

                <h2>

                    Sale Details

                </h2>

                <form

                    className="sales-form"

                    onSubmit={handleSubmit}

                >

                    <div className="form-grid">

                        <div className="form-group">

                            <label>

                                Product

                            </label>

                            <select

                                name="product"

                                value={formData.product}

                                onChange={handleChange}

                                required

                            >

                                <option value="">

                                    Select Product

                                </option>

                                {

                                    products.map(

                                        (product) => (

                                            <option

                                                key={product._id}

                                                value={product._id}

                                            >

                                                {product.name}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Customer

                            </label>

                            <select

                                name="customer"

                                value={formData.customer}

                                onChange={handleChange}

                            >

                                <option value="">

                                    Walk-in Customer

                                </option>

                                {

                                    customers.map(

                                        (customer) => (

                                            <option

                                                key={customer._id}

                                                value={customer._id}

                                            >

                                                {customer.name}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Customer Name

                            </label>

                            <input

                                type="text"

                                name="customerName"

                                value={formData.customerName}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Quantity

                            </label>

                            <input

                                type="number"

                                name="quantity"

                                value={formData.quantity}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Discount

                            </label>

                            <input

                                type="number"

                                name="discount"

                                value={formData.discount}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                GST %

                            </label>

                            <input

                                type="number"

                                name="gst"

                                value={formData.gst}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Payment Method

                            </label>

                            <select

                                name="paymentMethod"

                                value={formData.paymentMethod}

                                onChange={handleChange}

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

                        </div>

                        <div className="form-group">

                            <label>

                                Payment Status

                            </label>

                            <select

                                name="paymentStatus"

                                value={formData.paymentStatus}

                                onChange={handleChange}

                            >

                                <option>

                                    Paid

                                </option>

                                <option>

                                    Pending

                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Invoice Number

                            </label>

                            <input

                                type="text"

                                name="invoiceNumber"

                                value={formData.invoiceNumber}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Total Amount

                            </label>

                            <div className="total-card">

                                ₹{total.toLocaleString()}

                            </div>

                        </div>

                    </div>

                    <div className="remarks-section">

                        <label>

                            Remarks

                        </label>

                        <textarea
                            rows="4"
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                        ></textarea>


                    </div>

                    <div className="sales-actions">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={() =>

                                navigate(

                                    "/admin/sales"

                                )

                            }

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="sales-save-btn"

                        >

                            Update Sale

                        </button>

                    </div>

                </form>

            </div >

        </div >

    );
}

export default EditSale;