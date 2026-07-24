import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();


// Add Agent
router.post("/", async (req, res) => {

  try {

    console.log(req.body);

    const agent = await prisma.agent.create({

      data: {

        name: req.body.name,

        email: req.body.email,

        phone: req.body.phone,

        address: req.body.address,

        commission: Number(req.body.commission),

        status: req.body.status || "Active"

      }

    });


    res.status(201).json({

      success:true,

      message:"Agent Added Successfully",

      agent

    });


  } catch(error) {


    console.log(error);


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

});





// Get All Agents

router.get("/", async(req,res)=>{

  try{


    const agents = await prisma.agent.findMany({

      orderBy:{

        createdAt:"desc"

      }

    });


    res.json({

      success:true,

      agents

    });



  }catch(error){


    console.log(error);


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


});






// Update Agent

router.put("/:id", async(req,res)=>{

  try{


    const agent = await prisma.agent.update({

      where:{

        id:Number(req.params.id)

      },

      data:req.body


    });



    res.json({

      success:true,

      message:"Agent Updated",

      agent

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


});







// Delete Agent

router.delete("/:id", async(req,res)=>{

  try{


    await prisma.agent.delete({

      where:{

        id:Number(req.params.id)

      }

    });



    res.json({

      success:true,

      message:"Agent Deleted"

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


});




export default router;