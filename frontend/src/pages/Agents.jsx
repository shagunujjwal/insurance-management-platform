import { useEffect, useState } from "react";
import axios from "axios";
import "./Agents.css";


function Agents(){

  const [agents,setAgents] = useState([]);

  const [showForm,setShowForm] = useState(false);

  const [search,setSearch] = useState("");


  const [form,setForm] = useState({

    name:"",
    email:"",
    phone:"",
    address:"",
    commission:"",
    status:"Active"

  });



  useEffect(()=>{

    getAgents();

  },[]);




  const getAgents = async()=>{

    try{

      const res = await axios.get(
        "http://localhost:5000/api/agents"
      );


      console.log(res.data);


      setAgents(res.data.agents || []);


    }
    catch(error){

      console.log(error);

    }

  };





  const handleChange=(e)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };





  const addAgent=async(e)=>{

    e.preventDefault();


    try{


      await axios.post(

        "http://localhost:5000/api/agents",

        form

      );


      setForm({

        name:"",
        email:"",
        phone:"",
        address:"",
        commission:"",
        status:"Active"

      });


      setShowForm(false);


      getAgents();


    }
    catch(error){

      console.log(error);

    }


  };





  const deleteAgent=async(id)=>{

    try{


      await axios.delete(

        `http://localhost:5000/api/agents/${id}`

      );


      getAgents();


    }
    catch(error){

      console.log(error);

    }

  };





  const filteredAgents = agents.filter((agent)=>

    agent.name
    ?.toLowerCase()
    .includes(search.toLowerCase())

  );





  return(

    <div className="agents-page">



      <div className="agents-header">


        <h1>
          Agents Management
        </h1>



        <button

        className="add-btn"

        onClick={()=>setShowForm(!showForm)}

        >

        + Add Agent

        </button>


      </div>






      {

      showForm &&

      <div className="agent-form">


        <h2>
          Add New Agent
        </h2>



        <form onSubmit={addAgent}>


          <input
          name="name"
          placeholder="Agent Name"
          value={form.name}
          onChange={handleChange}
          />


          <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          />


          <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          />


          <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          />


          <input
          name="commission"
          placeholder="Commission"
          value={form.commission}
          onChange={handleChange}
          />



          <select
          name="status"
          value={form.status}
          onChange={handleChange}
          >

            <option value="Active">
              Active
            </option>


            <option value="Inactive">
              Inactive
            </option>


          </select>



          <button type="submit">

            Save Agent

          </button>


        </form>


      </div>

      }








      <div className="agent-table">


        <h2>
          All Agents
        </h2>



        <input

        className="search"

        placeholder="Search Agent..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        />





        <table>


        <thead>

        <tr>

        <th>Name</th>

        <th>Email</th>

        <th>Phone</th>

        <th>Status</th>

        <th>Action</th>


        </tr>


        </thead>





        <tbody>


        {

        filteredAgents.map((agent)=>(


        <tr key={agent.id}>


        <td>
          {agent.name}
        </td>


        <td>
          {agent.email}
        </td>


        <td>
          {agent.phone}
        </td>


        <td>
          {agent.status}
        </td>


        <td>


        <button

        className="delete-btn"

        onClick={()=>deleteAgent(agent.id)}

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



    </div>

  );

}


export default Agents;