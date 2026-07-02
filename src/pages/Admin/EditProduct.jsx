import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import {

    getProductById,

    updateProduct

} from "../../services/productService";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState([]);

    const [brands, setBrands] = useState([]);

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");

    const [formData, setFormData] = useState({

        name: "",

        category: "",

        brand: "",

        sku: "",

        description: "",

        purchasePrice: "",

        sellingPrice: "",

        stock: "",

        lowStockAlert: "",

        gst: "",

        supplier: "",

        unit: "Piece",

        barcode: "",

        featured: false,

        warranty: "",

        status: true

    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const [

                productRes,

                categoryRes,

                brandRes

            ] = await Promise.all([

                getProductById(id, token),

                axios.get(`${BASE_URL}/api/categories`),

                axios.get(`${BASE_URL}/api/brands`)

            ]);

            const product = productRes.product;

            setFormData({

                ...product,

                category: product.category?._id || product.category,

                brand: product.brand?._id || product.brand

            });

            if (product.images?.length > 0) {

                setPreview(product.images[0].url);

            }

            setCategories(categoryRes.data.categories);

            setBrands(brandRes.data.brands);

        }

        catch (error) {

            console.log(error);

            alert("Unable to load product.");

        }

        finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        const {

            name,

            value,

            checked,

            type

        } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]:

                type === "checkbox"

                    ? checked

                    : value

        }));

    };

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        setPreview(URL.createObjectURL(file));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            let submitData;

            if (image) {

                submitData = new FormData();

                Object.keys(formData).forEach((key) => {

                    submitData.append(

                        key,

                        formData[key]

                    );

                });

                submitData.append(

                    "image",

                    image

                );

            }

            else {

                submitData = formData;

            }

            await updateProduct(

                id,

                submitData,

                token

            );

            alert(

                "Product Updated Successfully"

            );

            navigate(

                "/admin/products"

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
    return (

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

                        Update complete product information.

                    </p>

                </div>

            </div>

            {

                loading

                    ?

                    <h2>Loading...</h2>

                    :

                    <form

                        className="product-form"

                        onSubmit={handleSubmit}

                    >

                        <div className="form-grid">

                            {/* Product Name */}

                            <div className="form-group">

                                <label>

                                    Product Name

                                </label>

                                <input

                                    type="text"

                                    name="name"

                                    value={formData.name}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            {/* Category */}

                            <div className="form-group">

                                <label>

                                    Category

                                </label>

                                <select

                                    name="category"

                                    value={formData.category}

                                    onChange={handleChange}

                                    required

                                >

                                    <option value="">

                                        Select Category

                                    </option>

                                    {

                                        categories.map(category => (

                                            <option

                                                key={category._id}

                                                value={category._id}

                                            >

                                                {category.name}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            {/* Brand */}

                            <div className="form-group">

                                <label>

                                    Brand

                                </label>

                                <select

                                    name="brand"

                                    value={formData.brand}

                                    onChange={handleChange}

                                >

                                    <option value="">

                                        Select Brand

                                    </option>

                                    {

                                        brands.map(brand => (

                                            <option

                                                key={brand._id}

                                                value={brand._id}

                                            >

                                                {brand.name}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            {/* SKU */}

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

                            {/* Purchase Price */}

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

                            {/* Selling Price */}

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

                            {/* Stock */}

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

                            {/* Low Stock */}

                            <div className="form-group">

                                <label>

                                    Low Stock Alert

                                </label>

                                <input

                                    type="number"

                                    name="lowStockAlert"

                                    value={formData.lowStockAlert}

                                    onChange={handleChange}

                                />

                            </div>

                            {/* GST */}

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

                            {/* Unit */}

                            <div className="form-group">

                                <label>

                                    Unit

                                </label>

                                <input

                                    name="unit"

                                    value={formData.unit}

                                    onChange={handleChange}

                                />

                            </div>

                            {/* Warranty */}

                            <div className="form-group">

                                <label>

                                    Warranty

                                </label>

                                <input

                                    name="warranty"

                                    value={formData.warranty}

                                    onChange={handleChange}

                                />

                            </div>

                            {/* Barcode */}

                            <div className="form-group">

                                <label>

                                    Barcode

                                </label>

                                <input

                                    name="barcode"

                                    value={formData.barcode}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <div className="description-section">

                            <label>

                                Description

                            </label>

                            <textarea

                                rows="5"

                                name="description"

                                value={formData.description}

                                onChange={handleChange}

                            />

                        </div>
                        <div className="form-grid">

                            <div className="form-group">

                                <label>

                                    Product Image

                                </label>

                                <input

                                    type="file"

                                    accept="image/*"

                                    onChange={handleImage}

                                />

                            </div>

                            {

                                preview &&

                                <div className="form-group">

                                    <label>

                                        Current Image

                                    </label>

                                    <img

                                        src={preview}

                                        alt="Preview"

                                        style={{

                                            width: 180,

                                            height: 180,

                                            objectFit: "cover",

                                            borderRadius: 10,

                                            border: "1px solid #ddd"

                                        }}

                                    />

                                </div>

                            }

                        </div>

                        <div

                            style={{

                                display: "flex",

                                gap: "30px",

                                marginTop: "20px",

                                marginBottom: "30px"

                            }}

                        >

                            <label>

                                <input

                                    type="checkbox"

                                    name="featured"

                                    checked={formData.featured}

                                    onChange={handleChange}

                                />

                                Featured Product

                            </label>

                            <label>

                                <input

                                    type="checkbox"

                                    name="status"

                                    checked={formData.status}

                                    onChange={handleChange}

                                />

                                Active Product

                            </label>

                        </div>

                        <div className="button-group">

                            <button

                                type="button"

                                className="cancel-btn"

                                onClick={() =>

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

            }

        </div>

    );

}

export default EditProduct;
