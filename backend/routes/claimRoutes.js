import express from "express";
import prisma from "../prisma/prismaClient.js";

const router = express.Router();



// Get All Claims

router.get("/", async (req, res) => {

  try {

    const claims = await prisma.claim.findMany({

      include:{

        policy:true

      }

    });


    res.json(claims);


  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});







// Add Claim

router.post("/", async(req,res)=>{


  try{


    const claim = await prisma.claim.create({

      data:{

        policyId:Number(req.body.policyId),

        claimAmount:Number(req.body.claimAmount),

        reason:req.body.reason,

        status:req.body.status || "Pending"

      }

    });



    res.json(claim);



  }
  catch(error){


    console.log(error);


    res.status(500).json({

      message:error.message

    });


  }


});








// Update Claim

router.put("/:id", async(req,res)=>{


  try{


    const claim = await prisma.claim.update({

      where:{

        id:Number(req.params.id)

      },


      data:{

        claimAmount:Number(req.body.claimAmount),

        reason:req.body.reason,

        status:req.body.status

      }


    });



    res.json(claim);



  }
  catch(error){


    console.log(error);


    res.status(500).json({

      message:error.message

    });


  }


});








// Delete Claim

router.delete("/:id", async(req,res)=>{


  try{


    await prisma.claim.delete({

      where:{

        id:Number(req.params.id)

      }

    });



    res.json({

      message:"Claim Deleted"

    });



  }
  catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});






export default router;