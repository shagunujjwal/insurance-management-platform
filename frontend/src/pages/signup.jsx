import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";


function Signup() {


  const navigate = useNavigate();



  const [formData,setFormData] = useState({

    name:"",
    email:"",
    password:"",
    role:"Customer"

  });





  const [loading,setLoading] = useState(false);





  const handleChange=(e)=>{


    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });


  };







  const handleSignup=async(e)=>{


    e.preventDefault();



    try{


      setLoading(true);



      const response = await axios.post(

        "https://insurance-management-platform-iem2.onrender.com:/api/auth/register",

        formData

      );




      alert(

        response.data.message ||

        "Signup Successful"

      );



      navigate("/");




    }

    catch(error){


      alert(

        error.response?.data?.message ||

        "Signup Failed"

      );


    }

    finally{


      setLoading(false);


    }


  };







  return (


    <div className="signup-page">



      <form

        className="signup-card"

        onSubmit={handleSignup}

      >



        <h1>
          🛡️ Insurance
        </h1>



        <p>
          Create New Account
        </p>





        <input

          type="text"

          name="name"

          placeholder="Enter Name"

          value={formData.name}

          onChange={handleChange}

        />





        <input

          type="email"

          name="email"

          placeholder="Enter Email"

          value={formData.email}

          onChange={handleChange}

        />





        <input

          type="password"

          name="password"

          placeholder="Enter Password"

          value={formData.password}

          onChange={handleChange}

        />






        <select

          name="role"

          value={formData.role}

          onChange={handleChange}

        >

          <option value="Customer">
            Customer
          </option>


          <option value="Agent">
            Agent
          </option>


          <option value="Admin">
            Admin
          </option>


        </select>






        <button

          className="signup-btn"

          type="submit"

          disabled={loading}

        >

          {
            loading
            ?
            "Creating..."
            :
            "Signup"
          }


        </button>






        <div className="login-link">


          Already have an account?

          {" "}


          <Link to="/">

            Login

          </Link>


        </div>




      </form>



    </div>


  );


}


export default Signup;