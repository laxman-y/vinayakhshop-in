import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CustomerForm from "../../components/Customers/CustomerForm";

import {
  getCustomerById,
  updateCustomer
} from "../../services/customerService";

import "./Customers.css";

function EditCustomer() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);

  useEffect(() => {

    loadCustomer();

  }, []);

  const loadCustomer = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const data =
        await getCustomerById(
          id,
          token
        );

      setCustomer(data.customer);

    } catch (err) {

      console.log(err);

      alert("Customer not found");

      navigate("/admin/customers");

    }

  };

  const handleUpdate = async (formData) => {

    try {

      const token =
        localStorage.getItem("token");

      await updateCustomer(
        id,
        formData,
        token
      );

      alert(
        "Customer Updated Successfully"
      );

      navigate("/admin/customers");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Update Failed"
      );

    }

  };

  if (!customer)
    return <h2>Loading...</h2>;

  return (

    <div className="customers-page">

      <div className="customer-header">

        <div>

          <h1>Edit Customer</h1>

          <p>

            Update customer information

          </p>

        </div>

      </div>

      <CustomerForm

        initialData={customer}

        onSubmit={handleUpdate}

      />

    </div>

  );

}

export default EditCustomer;