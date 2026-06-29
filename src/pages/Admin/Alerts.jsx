import { useEffect, useState } from "react";
import { getLowStockProducts } from "../../services/alertService";
import "./Alerts.css";

function Alerts() {

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const loadAlerts = async () => {

        try {

            setLoading(true);

            const data =
                await getLowStockProducts();

            setProducts(data.products || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadAlerts();

    }, []);

    const filteredProducts =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <div className="alerts-page">

            <div className="alerts-header">

                <div>

                    <h1>Low Stock Alerts</h1>

                    <p>
                        Monitor products that need immediate restocking.
                    </p>

                </div>

                <button
                    className="refresh-btn"
                    onClick={loadAlerts}
                >
                    Refresh
                </button>

            </div>

            <div className="summary-grid">

                <div className="summary-card">

                    <h4>Total Alerts</h4>

                    <h2>{products.length}</h2>

                </div>

                <div className="summary-card">

                    <h4>Out of Stock</h4>

                    <h2>

                        {
                            products.filter(
                                p => p.stock === 0
                            ).length
                        }

                    </h2>

                </div>

                <div className="summary-card">

                    <h4>Low Stock</h4>

                    <h2>

                        {
                            products.filter(
                                p => p.stock > 0
                            ).length
                        }

                    </h2>

                </div>

            </div>

            {

                products.length > 0 &&

                <div className="warning-banner">

                    <h3>
                        ⚠ Immediate Attention Required
                    </h3>

                    <p>

                        There are

                        <b> {products.length} </b>

                        products that require restocking.

                    </p>

                </div>

            }

            <div className="search-section">

                <input

                    type="text"

                    placeholder="Search Product..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                />

            </div>

            {

                loading ?

                    <div className="loading">

                        Loading Alerts...

                    </div>

                    :

                    filteredProducts.length === 0 ?

                        <div className="empty-state">

                            ✅ Great!

                            <br /><br />

                            All products are sufficiently stocked.

                        </div>

                        :

                        <table>

                            <thead>

                                <tr>

                                    <th>Product</th>

                                    <th>Category</th>

                                    <th>Brand</th>

                                    <th>Stock</th>

                                    <th>Alert Limit</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredProducts.map(product => (

                                        <tr key={product._id}>

                                            <td>{product.name}</td>

                                            <td>{product.category?.name}</td>

                                            <td>{product.brand?.name || "-"}</td>

                                            <td>{product.stock}</td>

                                            <td>{product.lowStockAlert}</td>

                                            <td>

                                                {

                                                    product.stock === 0 ?

                                                        <span className="out-stock">

                                                            OUT OF STOCK

                                                        </span>

                                                        :

                                                        <span className="low-stock">

                                                            LOW STOCK

                                                        </span>

                                                }

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

            }

        </div>

    );

}

export default Alerts;