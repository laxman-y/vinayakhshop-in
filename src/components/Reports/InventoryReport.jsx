import { useEffect, useMemo, useState } from "react";
import { getInventoryReport } from "../../services/reportService";
import "./InventoryReport.css";
import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportPDF";

function InventoryReport() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");

    useEffect(() => {

        loadInventory();

    }, []);

    const loadInventory = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const data =
                await getInventoryReport(token);

            setProducts(data.products);

        } catch (err) {

            console.log(err);

        }

    };

    const filtered = useMemo(() => {

        return products.filter((item) => {

            const keyword =
                search.toLowerCase();

            const product =
                item.name.toLowerCase();

            const categoryName =
                item.category?.name || "";

            const searchMatch =

                product.includes(keyword) ||

                categoryName.toLowerCase().includes(keyword);

            const categoryMatch =

                category === "All"

                    ? true

                    : categoryName === category;

            return searchMatch && categoryMatch;

        });

    }, [products, search, category]);

    const categories = [

        "All",

        ...new Set(

            products.map(

                (p) => p.category?.name

            )

        )

    ];

    const totalInventoryValue =
        filtered.reduce(

            (sum, item) =>

                sum +

                item.stock *

                item.purchasePrice,

            0

        );

    return (

        <div className="inventory-report">

            <div className="sales-toolbar">

                <input

                    type="text"

                    placeholder="Search Product..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                />

                <select

                    value={category}

                    onChange={(e) =>

                        setCategory(e.target.value)

                    }

                >

                    {

                        categories.map((cat) => (

                            <option

                                key={cat}

                                value={cat}

                            >

                                {cat}

                            </option>

                        ))

                    }

                </select>

                <button

                    className="refresh-btn"

                    onClick={loadInventory}

                >

                    🔄 Refresh

                </button>

                <button
                    className="excel-btn"
                    onClick={() => {

                        const rows =

                            filtered.map(

                                product => ({

                                    Product: product.name,

                                    Category: product.category?.name,

                                    Purchase: product.purchasePrice,

                                    Selling: product.sellingPrice,

                                    Stock: product.stock,

                                    Value: (

                                        product.stock *

                                        product.purchasePrice

                                    ).toLocaleString(),

                                    Status: product.stock === 0 ?

                                        "Out of Stock" :

                                        product.stock <= product.lowStockAlert ?

                                            "Low Stock" :

                                            "In Stock"

                                })

                            );

                        exportToExcel(

                            rows,

                            "Inventory_Report"

                        );

                    }}

                >

                    📊 Excel

                </button>

                <button

                    className="pdf-btn"

                    onClick={() => {

                        const columns = [

                            "Product",

                            "Category",

                            "Purchase",

                            "Selling",

                            "Stock",

                            "Value",

                            "Status"

                        ];

                        const rows = filtered.map((product) => [

                            product.name,

                            product.category?.name,

                            product.purchasePrice,

                            product.sellingPrice,

                            product.stock,

                            (product.stock * product.purchasePrice).toLocaleString(),

                            product.stock === 0 ?
                                "Out of Stock" :
                                product.stock <= product.lowStockAlert ?
                                    "Low Stock" :
                                    "In Stock"

                        ]);

                        exportToPDF(

                            "Inventory Report",

                            columns,

                            rows,

                            "Sales_Report"

                        );

                    }}

                >

                    📄 PDF

                </button>

                <button

                    className="print-btn"

                    onClick={() => window.print()}

                >

                    🖨 Print

                </button>

            </div>

            <div className="sales-summary">

                <div>

                    <h4>📦 Products</h4>

                    <h2>

                        {filtered.length}

                    </h2>

                </div>

                <div>

                    <h4>💰 Inventory Value</h4>

                    <h2>

                        ₹{totalInventoryValue.toLocaleString()}

                    </h2>

                </div>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Product</th>

                            <th>Category</th>

                            <th>Purchase</th>

                            <th>Selling</th>

                            <th>Stock</th>

                            <th>Value</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.length ?

                                filtered.map((item) => (

                                    <tr key={item._id}>

                                        <td>

                                            {item.name}

                                        </td>

                                        <td>

                                            {item.category?.name}

                                        </td>

                                        <td>

                                            ₹{item.purchasePrice}

                                        </td>

                                        <td>

                                            ₹{item.sellingPrice}

                                        </td>

                                        <td>

                                            {item.stock}

                                        </td>

                                        <td>

                                            ₹{

                                                (

                                                    item.stock *

                                                    item.purchasePrice

                                                ).toLocaleString()

                                            }

                                        </td>

                                        <td>

                                            {

                                                item.stock === 0 ?

                                                    <span className="status-out">

                                                        Out of Stock

                                                    </span>

                                                    :

                                                    item.stock <= item.lowStockAlert ?

                                                        <span className="status-low">

                                                            Low Stock

                                                        </span>

                                                        :

                                                        <span className="status-good">

                                                            In Stock

                                                        </span>

                                            }

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td

                                        colSpan="7"

                                        className="empty-table"

                                    >

                                        No Products Found

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default InventoryReport;