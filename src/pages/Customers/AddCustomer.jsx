import { useNavigate } from "react-router-dom";
import CustomerForm from "../../components/Customers/CustomerForm";
import { createCustomer } from "../../services/customerService";
import "./Customers.css";

function AddCustomer() {

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {

    try {

      const token = localStorage.getItem("token");

      await createCustomer(formData, token);

      alert("Customer Added Successfully");

      navigate("/admin/customers");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to add customer"
      );

    }

  };

  return (

    <div className="customers-page">

      <div className="customer-header">

        <div>

          <h1>Add Customer</h1>

          <p>Create a new customer</p>

        </div>

      </div>

      <CustomerForm
        onSubmit={handleSubmit}
      />

    </div>

  );

}

export default AddCustomer;