import { useEffect, useState } from "react";
import axios from "axios";
import "./Payments.css";


function Payments(){


  const [payments,setPayments] = useState([]);

  const [policies,setPolicies] = useState([]);



  const [formData,setFormData] = useState({

    policyId:"",
    amount:"",
    paymentStatus:"Paid"

  });






  const getPayments = async()=>{

    const res = await axios.get(

      "https://insurance-management-platform-iem2.onrender.com:/api/payments"

    );

    setPayments(res.data);

  };







  const getPolicies = async()=>{

    const res = await axios.get(

      "https://insurance-management-platform-iem2.onrender.com:/api/policies"

    );


    setPolicies(res.data);


  };






  useEffect(()=>{

    getPayments();

    getPolicies();

  },[]);







  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };








  const addPayment=async()=>{


    try{


      await axios.post(

        "https://insurance-management-platform-iem2.onrender.com:/api/payments",

        formData

      );


      alert("Payment Added");


      setFormData({

        policyId:"",
        amount:"",
        paymentStatus:"Paid"

      });


      getPayments();


    }
    catch(error){

      alert(error.response?.data?.message);

    }


  };








  const deletePayment=async(id)=>{


    await axios.delete(

      `https://insurance-management-platform-iem2.onrender.com:/api/payments/${id}`

    );


    alert("Payment Deleted");


    getPayments();


  };







  return(

    <div className="payments-page">


      <h1>
        Premium Payments
      </h1>





      <div className="form-box">


        <select

        name="policyId"

        value={formData.policyId}

        onChange={handleChange}

        >

          <option value="">
            Select Policy
          </option>


          {
            policies.map((p)=>(

              <option

              key={p.id}

              value={p.id}

              >

              {p.policyNumber}

              </option>

            ))
          }


        </select>





        <input

        name="amount"

        placeholder="Payment Amount"

        value={formData.amount}

        onChange={handleChange}

        />





        <select

        name="paymentStatus"

        value={formData.paymentStatus}

        onChange={handleChange}

        >

          <option>
            Paid
          </option>

          <option>
            Pending
          </option>


        </select>





        <button onClick={addPayment}>

          Add Payment

        </button>


      </div>







      <table>


        <thead>

          <tr>

            <th>ID</th>

            <th>Policy</th>

            <th>Amount</th>

            <th>Status</th>

            <th>Action</th>


          </tr>


        </thead>





        <tbody>


        {

          payments.map((p)=>(


            <tr key={p.id}>


              <td>
                {p.id}
              </td>


              <td>
                {p.policy?.policyNumber}
              </td>


              <td>
                {p.amount}
              </td>


              <td>
                {p.paymentStatus}
              </td>



              <td>

                <button

                onClick={()=>deletePayment(p.id)}

                >

                  Delete

                </button>


              </td>


            </tr>


          ))

        }


        </tbody>


      </table>



    </div>

  );


}


export default Payments;