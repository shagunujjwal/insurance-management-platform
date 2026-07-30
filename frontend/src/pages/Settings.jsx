import "./Settings.css";
import { useState } from "react";
import axios from "axios";


function Settings(){


  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const [name,setName] = useState(
    user?.name || ""
  );


  const [email,setEmail] = useState(
    user?.email || ""
  );



  const [oldPassword,setOldPassword] = useState("");

  const [newPassword,setNewPassword] = useState("");

  const [confirmPassword,setConfirmPassword] = useState("");





  const saveSettings = async()=>{


    try{


      const res = await axios.put(

        `https://insurance-management-platform-iem2.onrender.com/api/users/update-profile/${user.id}`,

        {

          name:name,

          email:email

        }

      );


      alert(res.data.message);



      localStorage.setItem(

        "user",

        JSON.stringify(res.data.user)

      );



    }
    catch(error){


      alert(

        error.response?.data?.message ||

        "Profile update failed"

      );


    }


  };







  const changePassword = async()=>{


    if(newPassword !== confirmPassword){


      alert(
        "New password and confirm password not match"
      );

      return;

    }




    try{


      const res = await axios.put(

        `https://insurance-management-platform-iem2.onrender.com/api/users/change-password/${user.id}`,

        {

          oldPassword:oldPassword,

          newPassword:newPassword

        }

      );



      alert(res.data.message);



      setOldPassword("");

      setNewPassword("");

      setConfirmPassword("");



    }
    catch(error){


      console.log(error.response?.data);



      alert(

        error.response?.data?.message ||

        "Password change failed"

      );


    }


  };







  return(


    <div className="settings-page">


      <h1>
        Settings
      </h1>





      <div className="settings-card">


        <h2>
          Profile Settings
        </h2>



        <label>
          Name
        </label>


        <input

        type="text"

        value={name}

        onChange={(e)=>setName(e.target.value)}

        />





        <label>
          Email
        </label>


        <input

        type="email"

        value={email}

        onChange={(e)=>setEmail(e.target.value)}

        />





        <button onClick={saveSettings}>

          Save Changes

        </button>


      </div>







      <div className="settings-card">


        <h2>
          Change Password
        </h2>




        <label>
          Old Password
        </label>


        <input

        type="password"

        value={oldPassword}

        onChange={(e)=>setOldPassword(e.target.value)}

        />






        <label>
          New Password
        </label>


        <input

        type="password"

        value={newPassword}

        onChange={(e)=>setNewPassword(e.target.value)}

        />






        <label>
          Confirm New Password
        </label>


        <input

        type="password"

        value={confirmPassword}

        onChange={(e)=>setConfirmPassword(e.target.value)}

        />






        <button onClick={changePassword}>

          Change Password

        </button>



      </div>






      <div className="settings-card">


        <h2>
          System Information
        </h2>


        <p>
          Insurance Management Platform
        </p>


        <p>
          Version 1.0.0
        </p>


      </div>



    </div>


  );


}


export default Settings;