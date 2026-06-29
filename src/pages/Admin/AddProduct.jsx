import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Upload,
    PackagePlus,
    Save,
    ArrowLeft
} from "lucide-react";

import {
    createProduct,
    uploadProductImage
} from "../../services/productService";

import { getCategories } from "../../services/categoryService";
import { getBrands } from "../../services/brandService";

import "./AddProduct.css";

function AddProduct() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);

    const [brands, setBrands] = useState([]);

    const [preview, setPreview] = useState("");

    const [imageFile, setImageFile] = useState(null);

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({

        name: "",

        category: "",

        brand: "",

        sku: "",

        description: "",

        purchasePrice: "",

        sellingPrice: "",

        stock: "",

        lowStockAlert: 5,

        gst: 18,

        warranty: "",

        unit: "Piece",

        barcode: "",

        featured: false,

        status: true

    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const [categoryRes, brandRes] = await Promise.all([

                getCategories(token),

                getBrands(token)

            ]);

            setCategories(categoryRes.categories || []);

            setBrands(brandRes.brands || []);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({

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

        setImageFile(file);

        setPreview(

            URL.createObjectURL(file)

        );

    };

    const validate = () => {

        let newErrors = {};

        if (!formData.name.trim())

            newErrors.name = "Product name required";

        if (!formData.category)

            newErrors.category = "Category required";

        if (!formData.sku.trim())

            newErrors.sku = "SKU required";

        if (!formData.purchasePrice)

            newErrors.purchasePrice = "Purchase price required";

        if (!formData.sellingPrice)

            newErrors.sellingPrice = "Selling price required";

        if (!formData.stock)

            newErrors.stock = "Stock required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            setLoading(true);

            let uploadedImage = null;

            if (imageFile) {

                uploadedImage = await uploadProductImage(

                    imageFile,

                    token

                );

            }

            const payload = {

                ...formData,

                purchasePrice:

                    Number(formData.purchasePrice),

                sellingPrice:

                    Number(formData.sellingPrice),

                stock:

                    Number(formData.stock),

                lowStockAlert:

                    Number(formData.lowStockAlert),

                gst:

                    Number(formData.gst),

                images:

                    uploadedImage

                        ? [uploadedImage]

                        : []

            };

            await createProduct(

                payload,

                token

            );

            alert("Product Added Successfully");

            navigate("/admin/products");

        }

        catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||

                "Something went wrong"

            );

        }

        finally {

            setLoading(false);

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

                        Add New Product

                    </h1>

                    <p>

                        Create a new inventory item for your hardware shop.

                    </p>

                </div>

                <button

                    className="back-btn"

                    onClick={() => navigate(-1)}

                >

                    <ArrowLeft size={18} />

                    Back

                </button>

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

                            type="text"

                            name="name"

                            value={formData.name}

                            onChange={handleChange}

                            placeholder="Bosch Drill Machine"

                        />

                        {errors.name &&

                            <small>

                                {errors.name}

                            </small>

                        }

                    </div>

                    <div className="form-group">

                        <label>

                            SKU

                        </label>

                        <input

                            type="text"

                            name="sku"

                            value={formData.sku}

                            onChange={handleChange}

                            placeholder="SKU-1001"

                        />

                        {errors.sku &&

                            <small>

                                {errors.sku}

                            </small>

                        }

                    </div>

                    <div className="form-group">

                        <label>

                            Category

                        </label>

                        <select

                            name="category"

                            value={formData.category}

                            onChange={handleChange}

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

                        {errors.category &&

                            <small>

                                {errors.category}

                            </small>

                        }

                    </div>

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

                                        <div className="form-group">

                        <label>

                            Purchase Price

                        </label>

                        <input

                            type="number"

                            name="purchasePrice"

                            value={formData.purchasePrice}

                            onChange={handleChange}

                            placeholder="Purchase Price"

                        />

                        {errors.purchasePrice &&

                            <small>

                                {errors.purchasePrice}

                            </small>

                        }

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

                            placeholder="Selling Price"

                        />

                        {errors.sellingPrice &&

                            <small>

                                {errors.sellingPrice}

                            </small>

                        }

                    </div>

                    <div className="form-group">

                        <label>

                            Stock Quantity

                        </label>

                        <input

                            type="number"

                            name="stock"

                            value={formData.stock}

                            onChange={handleChange}

                            placeholder="Current Stock"

                        />

                        {errors.stock &&

                            <small>

                                {errors.stock}

                            </small>

                        }

                    </div>

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

                            Warranty

                        </label>

                        <input

                            type="text"

                            name="warranty"

                            value={formData.warranty}

                            onChange={handleChange}

                            placeholder="1 Year"

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Unit

                        </label>

                        <select

                            name="unit"

                            value={formData.unit}

                            onChange={handleChange}

                        >

                            <option value="Piece">

                                Piece

                            </option>

                            <option value="Box">

                                Box

                            </option>

                            <option value="Packet">

                                Packet

                            </option>

                            <option value="Kg">

                                Kg

                            </option>

                            <option value="Litre">

                                Litre

                            </option>

                            <option value="Meter">

                                Meter

                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Barcode

                        </label>

                        <input

                            type="text"

                            name="barcode"

                            value={formData.barcode}

                            onChange={handleChange}

                            placeholder="Barcode"

                        />

                    </div>

                </div>

                <div className="description-section">

                    <label>

                        Description

                    </label>

                    <textarea

                        name="description"

                        rows="6"

                        value={formData.description}

                        onChange={handleChange}

                        placeholder="Write product description..."

                    />

                </div>

                <div className="switch-grid">

                    <label className="switch-card">

                        <input

                            type="checkbox"

                            name="featured"

                            checked={formData.featured}

                            onChange={handleChange}

                        />

                        <span>

                            Featured Product

                        </span>

                    </label>

                    <label className="switch-card">

                        <input

                            type="checkbox"

                            name="status"

                            checked={formData.status}

                            onChange={handleChange}

                        />

                        <span>

                            Active Product

                        </span>

                    </label>

                </div>

                <div className="upload-section">

                    <h3>

                        Product Image

                    </h3>

                    <label className="upload-box">

                        <Upload size={55} />

                        <h4>

                            Upload Product Image

                        </h4>

                        <p>

                            PNG, JPG, JPEG or WEBP

                        </p>

                        <input

                            type="file"

                            accept="image/*"

                            onChange={handleImage}

                            hidden

                        />

                    </label>

                    {

                        preview &&

                        <div className="preview-area">

                            <img

                                src={preview}

                                alt="Preview"

                            />

                        </div>

                    }

                </div>

                                <div className="button-group">

                    <button

                        type="button"

                        className="cancel-btn"

                        onClick={() => navigate("/admin/products")}

                    >

                        <ArrowLeft size={18} />

                        Cancel

                    </button>

                    <button

                        type="submit"

                        className="save-btn"

                        disabled={loading}

                    >

                        <Save size={18} />

                        {

                            loading

                                ? "Saving Product..."

                                : "Save Product"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

}

export default AddProduct;