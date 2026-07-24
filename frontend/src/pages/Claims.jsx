import { useEffect, useState } from "react";
import axios from "axios";
import "./Claims.css";


function Claims() {


  const [claims,setClaims] = useState([]);

  const [policies,setPolicies] = useState([]);

  const [editId,setEditId] = useState(null);



  const [formData,setFormData] = useState({

    policyId:"",
    claimAmount:"",
    reason:"",
    status:"Pending"

  });





  const getClaims = async()=>{

    const res = await axios.get(
      "https://insurance-management-platform-iem2.onrender.com:5000/api/claims"
    );

    setClaims(res.data);

  };





  const getPolicies = async()=>{

    const res = await axios.get(
      "https://insurance-management-platform-iem2.onrender.com:5000/api/policies"
    );

    setPolicies(res.data);

  };






  useEffect(()=>{

    getClaims();

    getPolicies();

  },[]);






  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };







  const saveClaim=async()=>{


    try{


      if(editId){


        await axios.put(

          `https://insurance-management-platform-iem2.onrender.com:5000/api/claims/${editId}`,

          formData

        );


        alert("Claim Updated");


      }
      else{


        await axios.post(

          "https://insurance-management-platform-iem2.onrender.com:5000/api/claims",

          formData

        );


        alert("Claim Added");


      }





      setEditId(null);


      setFormData({

        policyId:"",
        claimAmount:"",
        reason:"",
        status:"Pending"

      });



      getClaims();



    }
    catch(error){

      alert(error.response?.data?.message);

    }


  };








  const editClaim=(claim)=>{


    setEditId(claim.id);


    setFormData({

      policyId:claim.policyId,

      claimAmount:claim.claimAmount,

      reason:claim.reason,

      status:claim.status

    });


  };








  const deleteClaim=async(id)=>{


    await axios.delete(

      `https://insurance-management-platform-iem2.onrender.com:5000/api/claims/${id}`

    );


    alert("Claim Deleted");


    getClaims();


  };








  return (

    <div className="claims-page">


      <h1>
        Claims
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

        name="claimAmount"

        placeholder="Claim Amount"

        value={formData.claimAmount}

        onChange={handleChange}

        />






        <input

        name="reason"

        placeholder="Reason"

        value={formData.reason}

        onChange={handleChange}

        />







        <select

        name="status"

        value={formData.status}

        onChange={handleChange}

        >


          <option>
            Pending
          </option>

          <option>
            Approved
          </option>

          <option>
            Rejected
          </option>


        </select>






        <button onClick={saveClaim}>

        {

          editId
          ?
          "Update Claim"
          :
          "Add Claim"

        }

        </button>



      </div>








      <table>


        <thead>

          <tr>

            <th>ID</th>

            <th>Policy</th>

            <th>Amount</th>

            <th>Reason</th>

            <th>Status</th>

            <th>Action</th>


          </tr>

        </thead>





        <tbody>


        {

          claims.map((c)=>(


            <tr key={c.id}>


              <td>
                {c.id}
              </td>


              <td>
                {c.policy?.policyNumber}
              </td>


              <td>
                {c.claimAmount}
              </td>


              <td>
                {c.reason}
              </td>


              <td>
                {c.status}
              </td>



              <td>


                <button

                onClick={()=>editClaim(c)}

                >

                ✏️ Edit

                </button>





                <button

                onClick={()=>deleteClaim(c.id)}

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


export default Claims;