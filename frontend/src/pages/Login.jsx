import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function Login(){

  const navigate = useNavigate();


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");



  const handleLogin = async(e)=>{

    e.preventDefault();


    try{

      const res = await axios.post(

        "http://localhost:5000/api/auth/login",

        {
          email,
          password
        }

      );


      localStorage.setItem(

        "user",

        JSON.stringify(res.data.user)

      );


      alert("Login Successful");


      navigate("/dashboard");


    }

    catch(error){

      alert(

        error.response?.data?.message ||

        "Login Failed"

      );

    }


  };



  return(


    <div className="login-page">


      <div className="login-left">


        <h1>
          🛡️ Insurance Management
        </h1>


        <p>
          Manage customers, policies, claims and agents easily.
        </p>


      </div>




      <div className="login-box">


        <h2>
          Welcome Back
        </h2>


        <p>
          Login to your account
        </p>




        <form onSubmit={handleLogin}>


          <input

            type="email"

            placeholder="Enter Email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            required

          />



          <input

            type="password"

            placeholder="Enter Password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            required

          />



          <button type="submit">

            Login

          </button>


        </form>



        <p className="signup-text">

          Don't have an account?{" "}

          <Link to="/signup">

            Signup

          </Link>


        </p>



      </div>



    </div>


  );


}


export default Login;