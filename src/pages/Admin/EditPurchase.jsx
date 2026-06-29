import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import axios from "axios";

import {

    getPurchaseById,

    updatePurchase

} from "../../services/purchaseService";

import "./Purchases.css";

function EditPurchase(){

    const { id } = useParams();

    const navigate = useNavigate();

    const token =

        localStorage.getItem("token");

    const [loading,setLoading] =

        useState(true);

    const [products,setProducts] =

        useState([]);

    const [suppliers,setSuppliers] =

        useState([]);

    const [formData,setFormData] =

        useState({

            product:"",

            supplier:"",

            quantity:"",

            purchasePrice:"",

            invoiceNumber:"",

            remarks:""

        });

    useEffect(()=>{

        loadData();

    },[]);

    const loadData = async()=>{

        try{

            const [

                purchaseRes,

                productRes,

                supplierRes

            ] = await Promise.all([

                getPurchaseById(

                    id,

                    token

                ),

                axios.get(

                    "http://localhost:5000/api/products?page=1&limit=500"

                ),

                axios.get(

                    "http://localhost:5000/api/suppliers"

                )

            ]);

            const purchase =

                purchaseRes.purchase;

            setProducts(

                productRes.data.products

            );

            setSuppliers(

                supplierRes.data.suppliers

            );

            setFormData({

                product:

                    purchase.product?._id ||

                    "",

                supplier:

                    purchase.supplier?._id ||

                    "",

                quantity:

                    purchase.quantity,

                purchasePrice:

                    purchase.purchasePrice,

                invoiceNumber:

                    purchase.invoiceNumber,

                remarks:

                    purchase.remarks

            });

        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }

    };

    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:

                e.target.value

        });

    };

    const total =

        Number(formData.quantity||0)
        *
        Number(formData.purchasePrice||0);
       const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updatePurchase(

                id,

                formData,

                token

            );

            alert(

                "Purchase Updated Successfully"

            );

            navigate(

                "/admin/purchases"

            );

        }

        catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||

                "Update Failed"

            );

        }

    };

    if (loading) {

        return (

            <div className="purchase-page">

                <h2>

                    Loading Purchase...

                </h2>

            </div>

        );

    }

    return (

        <div className="purchase-page">

            <div className="purchase-header">

                <div>

                    <span className="page-tag">

                        PURCHASE MANAGEMENT

                    </span>

                    <h1>

                        Edit Purchase

                    </h1>

                    <p>

                        Update purchase information and
                        inventory will automatically
                        synchronize.

                    </p>

                </div>

            </div>

            <div className="purchase-form-card">

                <div className="section-header">

                    <h2>

                        Purchase Details

                    </h2>

                </div>

                <form

                    className="purchase-form"

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

                                        (product)=>(

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

                                Supplier

                            </label>

                            <select

                                name="supplier"

                                value={formData.supplier}

                                onChange={handleChange}

                                required

                            >

                                <option value="">

                                    Select Supplier

                                </option>

                                {

                                    suppliers.map(

                                        (supplier)=>(

                                            <option

                                                key={supplier._id}

                                                value={supplier._id}

                                            >

                                                {supplier.name}

                                            </option>

                                        )

                                    )

                                }

                            </select>

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

                                Purchase Price

                            </label>

                            <input

                                type="number"

                                name="purchasePrice"

                                value={formData.purchasePrice}

                                onChange={handleChange}

                                required

                            />

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

                                ₹

                                {total.toLocaleString()}

                            </div>

                        </div>

                    </div>

                    <div className="remarks-section">

                        <label>

                            Remarks

                        </label>

                        <textarea

                            rows="5"

                            name="remarks"

                            value={formData.remarks}

                            onChange={handleChange}

                        />

                    </div>
                                        <div className="purchase-actions">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={()=>

                                navigate(

                                    "/admin/purchases"

                                )

                            }

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="purchase-save-btn"

                        >

                            Update Purchase

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditPurchase;
