import express from "express";
import prisma from "../prisma/prismaClient.js";


const router = express.Router();



// Get All Customers

router.get("/", async (req, res) => {

  try {

    const customers = await prisma.customer.findMany();

    res.json(customers);


  } catch(error) {

    res.status(500).json({

      message:error.message

    });

  }

});






// Add Customer

router.post("/", async (req, res) => {

  try {


    const {
      name,
      dob,
      phone,
      address,
      email
    } = req.body;



    const customer = await prisma.customer.create({

      data:{

        name,

        dob:new Date(dob),

        phone,

        address,

        email

      }

    });



    res.json(customer);



  } catch(error) {


    console.log(error);


    res.status(500).json({

      message:error.message

    });


  }

});







// Update Customer

router.put("/:id", async(req,res)=>{


  try{


    const customer = await prisma.customer.update({

      where:{

        id:Number(req.params.id)

      },


      data:{

        ...req.body,

        dob:new Date(req.body.dob)

      }


    });



    res.json(customer);



  }

  catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});








// Delete Customer

router.delete("/:id", async(req,res)=>{


  try{


    await prisma.customer.delete({

      where:{

        id:Number(req.params.id)

      }

    });



    res.json({

      message:"Customer Deleted"

    });



  }

  catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});







export default router;