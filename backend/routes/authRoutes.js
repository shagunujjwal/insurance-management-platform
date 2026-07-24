import express from "express";
import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";

const router = express.Router();


// ================= REGISTER =================

router.post("/register", async (req,res)=>{

  try{

    const {
      name,
      email,
      password,
      role
    } = req.body;


    const existingUser = await prisma.user.findUnique({

      where:{
        email: email
      }

    });


    if(existingUser){

      return res.status(400).json({

        message:"User already exists"

      });

    }



    const hashedPassword = await bcrypt.hash(
      password,
      10
    );



    const user = await prisma.user.create({

      data:{

        name:name,

        email:email,

        password:hashedPassword,

        role:role || "Admin"

      }

    });



    res.json({

      success:true,

      message:"Registration Successful",

      user:user

    });



  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }


});





// ================= LOGIN =================

router.post("/login", async(req,res)=>{


  try{


    const {
      email,
      password
    } = req.body;



    const user = await prisma.user.findUnique({

      where:{
        email:email
      }

    });





    if(!user){

      return res.status(404).json({

        message:"User not found"

      });

    }






    const passwordMatch = await bcrypt.compare(

      password,

      user.password

    );





    if(!passwordMatch){


      return res.status(400).json({

        message:"Invalid password"

      });


    }





    res.json({

      success:true,

      message:"Login Successful",

      user:{

        id:user.id,

        name:user.name,

        email:user.email,

        role:user.role

      }

    });





  }
  catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});





export default router;