import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getProductById,
    updateProduct
} from "../../services/productService";

function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [loading,setLoading]=useState(true);

    const [formData,setFormData]=useState(null);

    useEffect(()=>{

        loadProduct();

    },[]);

    const loadProduct=async()=>{

        try{

            const data=

                await getProductById(

                    id,

                    token

                );

            setFormData(data.product);

        }

        catch(error){

            console.log(error);

            alert("Unable to load product");

        }

        finally{

            setLoading(false);

        }

    };

    const handleChange=(e)=>{

        const{

            name,

            value,

            checked,

            type

        }=e.target;

        setFormData(prev=>({

            ...prev,

            [name]:

                type==="checkbox"

                ?

                checked

                :

                value

        }));

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            await updateProduct(

                id,

                formData,

                token

            );

            alert(

                "Product Updated Successfully"

            );

            navigate("/admin/products");

        }

        catch(error){

            console.log(error);

            alert("Update Failed");

        }

    };

    if(loading){

        return <h2>Loading...</h2>;

    }

    return(

        <div className="add-product-page">

            <div className="add-header">

                <div>

                    <span className="page-tag">

                        INVENTORY

                    </span>

                    <h1>

                        Edit Product

                    </h1>

                    <p>

                        Update product details.

                    </p>

                </div>

            </div>

            <form

                className="product-form"

                onSubmit={handleSubmit}

            >

                <div className="form-grid">

                    <div className="form-group">

                        <label>

                            Product Name

                        </label>

                        <input

                            name="name"

                            value={formData.name}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            SKU

                        </label>

                        <input

                            name="sku"

                            value={formData.sku}

                            onChange={handleChange}

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

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Selling Price

                        </label>

                        <input

                            type="number"

                            name="sellingPrice"

                            value={formData.sellingPrice}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Stock

                        </label>

                        <input

                            type="number"

                            name="stock"

                            value={formData.stock}

                            onChange={handleChange}

                        />

                    </div>

                </div>

                <div className="description-section">

                    <label>

                        Description

                    </label>

                    <textarea

                        rows="6"

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                    />

                </div>

                <div className="button-group">

                    <button

                        type="button"

                        className="cancel-btn"

                        onClick={()=>

                            navigate(

                                "/admin/products"

                            )

                        }

                    >

                        Cancel

                    </button>

                    <button

                        type="submit"

                        className="save-btn"

                    >

                        Update Product

                    </button>

                </div>

            </form>

        </div>

    );

}

export default EditProduct;