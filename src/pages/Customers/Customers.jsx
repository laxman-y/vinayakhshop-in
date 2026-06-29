import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCustomers,
  deleteCustomer
} from "../../services/customerService";
import "./Customers.css";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    loadCustomers();

  }, []);

  const loadCustomers = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const data =
        await getCustomers(token);

      setCustomers(data.customers);

    } catch (err) {

      console.log(err);

    }

  };

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this customer?"
      )
    ) return;

    try {

      const token =
        localStorage.getItem("token");

      await deleteCustomer(
        id,
        token
      );

      loadCustomers();

    } catch (err) {

      console.log(err);

    }

  };

  const filteredCustomers =
    useMemo(() => {

      return customers.filter((c) => {

        const keyword =
          search.toLowerCase();

        return (

          c.name.toLowerCase().includes(keyword) ||

          c.phone.includes(keyword) ||

          c.city.toLowerCase().includes(keyword)

        );

      });

    }, [customers, search]);

  const activeCustomers =
    customers.filter(
      (c) => c.status
    ).length;

  const totalOpening =
    customers.reduce(
      (sum, c) =>
        sum + c.openingBalance,
      0
    );

  const totalCredit =
    customers.reduce(
      (sum, c) =>
        sum + c.creditLimit,
      0
    );

  return (

    <div className="customers-page">

      <div className="customer-header">

        <div>

          <h1>

            Customer Management

          </h1>

          <p>

            Manage all customers

          </p>

        </div>

        <Link to="/admin/customers/add">

          <button className="add-btn">

            + Add Customer

          </button>

        </Link>

      </div>

      <div className="customer-cards">

        <div className="customer-card">

          <h4>

            Total Customers

          </h4>

          <h2>

            {customers.length}

          </h2>

        </div>

        <div className="customer-card">

          <h4>

            Active

          </h4>

          <h2>

            {activeCustomers}

          </h2>

        </div>

        <div className="customer-card">

          <h4>

            Opening Balance

          </h4>

          <h2>

            ₹{totalOpening.toLocaleString()}

          </h2>

        </div>

        <div className="customer-card">

          <h4>

            Credit Limit

          </h4>

          <h2>

            ₹{totalCredit.toLocaleString()}

          </h2>

        </div>

      </div>

      <input

        className="customer-search"

        placeholder="Search Name / Phone / City"

        value={search}

        onChange={(e)=>

          setSearch(e.target.value)

        }

      />

      <div className="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Phone</th>

              <th>City</th>

              <th>Credit</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {

              filteredCustomers.length ?

              filteredCustomers.map((customer)=>(

                <tr key={customer._id}>

                  <td>

                    {customer.name}

                  </td>

                  <td>

                    {customer.phone}

                  </td>

                  <td>

                    {customer.city}

                  </td>

                  <td>

                    ₹{customer.creditLimit}

                  </td>

                  <td>

                    {

                      customer.status ?

                      <span className="status-active">

                        Active

                      </span>

                      :

                      <span className="status-inactive">

                        Inactive

                      </span>

                    }

                  </td>

                  <td>

                    <Link

                      to={`/admin/customers/edit/${customer._id}`}

                    >

                      <button className="edit-btn">

                        Edit

                      </button>

                    </Link>

                    <button

                      className="delete-btn"

                      onClick={()=>

                        handleDelete(customer._id)

                      }

                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))

              :

              <tr>

                <td

                  colSpan="6"

                  className="empty-table"

                >

                  No Customers Found

                </td>

              </tr>

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Customers;