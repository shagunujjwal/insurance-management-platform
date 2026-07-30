import { useEffect, useState } from "react";
import axios from "axios";
import "./Customers.css";

import { FaUsers, FaPlus } from "react-icons/fa";


function Customers() {


  const [customers,setCustomers] = useState([]);

  const [showForm,setShowForm] = useState(false);

  const [editId,setEditId] = useState(null);



  const [formData,setFormData] = useState({

    name:"",
    dob:"",
    phone:"",
    address:"",
    email:""

  });





  const getCustomers = async()=>{

    try{

      const res = await axios.get(
        "https://insurance-management-platform-iem2.onrender.com/api/customers"
      );

      setCustomers(res.data);

    }
    catch(error){

      console.log(error);

    }

  };





  useEffect(()=>{

    getCustomers();

  },[]);







  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };







  const saveCustomer = async()=>{


    try{


      if(editId){


        await axios.put(

          `https://insurance-management-platform-iem2.onrender.com/api/customers/${editId}`,

          formData

        );


        alert("Customer Updated");


      }
      else{


        await axios.post(

          "https://insurance-management-platform-iem2.onrender.com/api/customers",

          formData

        );


        alert("Customer Added");


      }






      setFormData({

        name:"",
        dob:"",
        phone:"",
        address:"",
        email:""

      });


      setEditId(null);

      setShowForm(false);

      getCustomers();



    }
    catch(error){

      alert(
        error.response?.data?.message
      );

    }


  };







  const editCustomer=(customer)=>{


    setEditId(customer.id);


    setFormData({

      name:customer.name,

      dob:customer.dob.substring(0,10),

      phone:customer.phone,

      address:customer.address,

      email:customer.email

    });


    setShowForm(true);


  };








  const deleteCustomer=async(id)=>{


    try{


      await axios.delete(

        `https://insurance-management-platform-iem2.onrender.com/api/customers/${id}`

      );


      alert("Customer Deleted");


      getCustomers();


    }
    catch(error){

      console.log(error);

    }


  };








  return (


    <div className="customers-page">


      <div className="customers-header">


        <h1>

          <FaUsers/>

          Customers

        </h1>




        <button

          className="add-btn"

          onClick={()=>setShowForm(!showForm)}

        >

          <FaPlus/>

          Add Customer

        </button>


      </div>







      {
        showForm &&

        <div className="form-box">


          <input

          name="name"

          placeholder="Name"

          value={formData.name}

          onChange={handleChange}

          />



          <input

          type="date"

          name="dob"

          value={formData.dob}

          onChange={handleChange}

          />



          <input

          name="phone"

          placeholder="Phone"

          value={formData.phone}

          onChange={handleChange}

          />



          <input

          name="address"

          placeholder="Address"

          value={formData.address}

          onChange={handleChange}

          />



          <input

          name="email"

          placeholder="Email"

          value={formData.email}

          onChange={handleChange}

          />




          <button

          className="save-btn"

          onClick={saveCustomer}

          >

          {editId ? "Update Customer" : "Save Customer"}

          </button>



        </div>

      }







      <div className="table-card">


        <table>


          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Address</th>

              <th>Action</th>

            </tr>

          </thead>





          <tbody>


          {
            customers.map((customer)=>(


              <tr key={customer.id}>


                <td>{customer.id}</td>

                <td>{customer.name}</td>

                <td>{customer.email}</td>

                <td>{customer.phone}</td>

                <td>{customer.address}</td>


                <td>


                  <button

                  onClick={()=>editCustomer(customer)}

                  >

                  ✏️ Edit

                  </button>




                  <button

                  onClick={()=>deleteCustomer(customer.id)}

                  >

                  🗑️ Delete

                  </button>



                </td>


              </tr>


            ))
          }



          </tbody>



        </table>



      </div>



    </div>


  );


}


export default Customers;