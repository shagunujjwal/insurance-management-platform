import express from "express";
import prisma from "../prisma/prismaClient.js";

const router = express.Router();


// Get All Payments

router.get("/", async(req,res)=>{

  try{

    const payments = await prisma.premiumPayment.findMany({

      include:{
        policy:true
      }

    });


    res.json(payments);


  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});




// Add Payment

router.post("/", async(req,res)=>{


  try{


    const payment = await prisma.premiumPayment.create({

      data:{

        policyId:Number(req.body.policyId),

        amount:Number(req.body.amount),

        paymentStatus:req.body.paymentStatus || "Paid"

      }

    });


    res.json(payment);



  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }


});




// Delete Payment

router.delete("/:id", async(req,res)=>{


  try{


    await prisma.premiumPayment.delete({

      where:{

        id:Number(req.params.id)

      }

    });



    res.json({

      message:"Payment Deleted"

    });


  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }


});



export default router;