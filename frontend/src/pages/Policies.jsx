import { useEffect, useState } from "react";
import axios from "axios";
import "./Policies.css";


function Policies() {


  const [policies,setPolicies] = useState([]);

  const [customers,setCustomers] = useState([]);

  const [editId,setEditId] = useState(null);



  const [formData,setFormData] = useState({

    customerId:"",
    policyType:"",
    policyNumber:"",
    premiumAmount:"",
    startDate:"",
    endDate:"",
    status:"Active"

  });





  const getPolicies = async()=>{

    try{
      const res = await axios.get("https://insurance-management-platform-iem2.onrender.com/api/policies");
  

      setPolicies(res.data);

    }
    catch(error){

      console.log(error);

    }

  };






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

    getPolicies();

    getCustomers();

  },[]);







  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };








  const savePolicy=async()=>{


    try{


      if(editId){


        await axios.put(

          `https://insurance-management-platform-iem2.onrender.com/api/policies/${editId}`,

          formData

        );


        alert("Policy Updated");


      }
      else{


        await axios.post(

         "https://insurance-management-platform-iem2.onrender.com/api/policies",

          formData

        );


        alert("Policy Added");


      }






      setFormData({

        customerId:"",
        policyType:"",
        policyNumber:"",
        premiumAmount:"",
        startDate:"",
        endDate:"",
        status:"Active"

      });



      setEditId(null);


      getPolicies();



    }
    catch(error){

      alert(
        error.response?.data?.message
      );

    }


  };









  const editPolicy=(policy)=>{


    setEditId(policy.id);


    setFormData({

      customerId:policy.customerId,

      policyType:policy.policyType,

      policyNumber:policy.policyNumber,

      premiumAmount:policy.premiumAmount,

      startDate:policy.startDate.substring(0,10),

      endDate:policy.endDate.substring(0,10),

      status:policy.status

    });


  };








  const deletePolicy=async(id)=>{


    try{


      await axios.delete(

        `https://insurance-management-platform-iem2.onrender.com/api/policies/${id}`

      );



      alert("Policy Deleted");


      getPolicies();



    }
    catch(error){

      console.log(error);

    }


  };









  return (

    <div className="policies-page">


      <h1>
        Policies
      </h1>





      <div className="form-box">



        <select

        name="customerId"

        value={formData.customerId}

        onChange={handleChange}

        >

        <option value="">
          Select Customer
        </option>


        {

        customers.map((c)=>(

          <option

          key={c.id}

          value={c.id}

          >

            {c.name}

          </option>


        ))

        }


        </select>





        <input

        name="policyType"

        placeholder="Policy Type"

        value={formData.policyType}

        onChange={handleChange}

        />





        <input

        name="policyNumber"

        placeholder="Policy Number"

        value={formData.policyNumber}

        onChange={handleChange}

        />





        <input

        name="premiumAmount"

        placeholder="Premium Amount"

        value={formData.premiumAmount}

        onChange={handleChange}

        />





        <input

        type="date"

        name="startDate"

        value={formData.startDate}

        onChange={handleChange}

        />





        <input

        type="date"

        name="endDate"

        value={formData.endDate}

        onChange={handleChange}

        />





        <button onClick={savePolicy}>

          {
            editId
            ?
            "Update Policy"
            :
            "Add Policy"
          }

        </button>



      </div>








      <table>


        <thead>

          <tr>

            <th>ID</th>

            <th>Customer</th>

            <th>Type</th>

            <th>Policy No.</th>

            <th>Premium</th>

            <th>Status</th>

            <th>Action</th>


          </tr>


        </thead>






        <tbody>


        {

          policies.map((p)=>(


            <tr key={p.id}>


              <td>
                {p.id}
              </td>


              <td>
                {p.customer?.name}
              </td>


              <td>
                {p.policyType}
              </td>


              <td>
                {p.policyNumber}
              </td>


              <td>
                {p.premiumAmount}
              </td>


              <td>
                {p.status}
              </td>



              <td>


                <button

                onClick={()=>editPolicy(p)}

                >

                  ✏️ Edit

                </button>




                <button

                onClick={()=>deletePolicy(p.id)}

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

  );


}


export default Policies;