import express from "express";
import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";

const router = express.Router();



// UPDATE PROFILE

router.put("/update-profile/:id", async(req,res)=>{

  try{

    const {name,email} = req.body;


    const user = await prisma.user.update({

      where:{

        id:Number(req.params.id)

      },

      data:{

        name:name,

        email:email

      }

    });



    res.json({

      success:true,

      message:"Profile Updated Successfully",

      user:user

    });


  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});








// CHANGE PASSWORD

router.put("/change-password/:id", async(req,res)=>{


  try{


    const {

      oldPassword,

      newPassword

    } = req.body;





    const user = await prisma.user.findUnique({

      where:{

        id:Number(req.params.id)

      }

    });






    if(!user){

      return res.status(404).json({

        message:"User not found"

      });

    }







    const passwordMatch = await bcrypt.compare(

      oldPassword,

      user.password

    );







    if(!passwordMatch){


      return res.status(400).json({

        message:"Old password incorrect"

      });


    }







    const hashedPassword = await bcrypt.hash(

      newPassword,

      10

    );








    const updatedUser = await prisma.user.update({

      where:{

        id:user.id

      },


      data:{

        password:hashedPassword

      }


    });







    res.json({

      success:true,

      message:"Password Changed Successfully"

    });





  }
  catch(error){


    res.status(500).json({

      message:error.message

    });


  }



});





export default router;