import express from "express";
import prisma from "../prisma/prismaClient.js";

const router = express.Router();


// Get All Policies

router.get("/", async (req, res) => {

  try {

    const policies = await prisma.policy.findMany({

      include: {
        customer: true
      }

    });

    res.json(policies);


  } catch(error) {

    res.status(500).json({

      message:error.message

    });

  }

});





// Add Policy

router.post("/", async (req, res) => {

  try {


    const policy = await prisma.policy.create({

      data:{

        customerId:Number(req.body.customerId),

        policyType:req.body.policyType,

        policyNumber:req.body.policyNumber,

        premiumAmount:Number(req.body.premiumAmount),

        startDate:new Date(req.body.startDate),

        endDate:new Date(req.body.endDate),

        status:req.body.status || "Active"

      }

    });


    res.json(policy);



  } catch(error) {


    console.log(error);


    res.status(500).json({

      message:error.message

    });


  }

});







// Update Policy

router.put("/:id", async(req,res)=>{


  try{


    const policy = await prisma.policy.update({

      where:{

        id:Number(req.params.id)

      },


      data:{


        policyType:req.body.policyType,


        policyNumber:req.body.policyNumber,


        premiumAmount:Number(req.body.premiumAmount),


        startDate:new Date(req.body.startDate),


        endDate:new Date(req.body.endDate),


        status:req.body.status


      }


    });



    res.json(policy);



  }
  catch(error){


    console.log(error);


    res.status(500).json({

      message:error.message

    });


  }


});








// Delete Policy

router.delete("/:id", async(req,res)=>{


  try{


    await prisma.policy.delete({

      where:{

        id:Number(req.params.id)

      }

    });



    res.json({

      message:"Policy Deleted"

    });



  }
  catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});





export default router;