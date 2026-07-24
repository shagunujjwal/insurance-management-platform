import express from "express";
import prisma from "../prisma/prismaClient.js";

const router = express.Router();



router.get("/stats", async(req,res)=>{

  try{


    const customers = await prisma.customer.count();


    const policies = await prisma.policy.count();


    const claims = await prisma.claim.count();


    const agents = await prisma.agent.count();





    const recentCustomers = await prisma.customer.findMany({

      take:5,

      orderBy:{

        createdAt:"desc"

      }

    });







    const recentPolicies = await prisma.policy.findMany({

      take:5,

      orderBy:{

        id:"desc"

      },

      include:{

        customer:true

      }

    });








    const recentAgents = await prisma.agent.findMany({

      take:5,

      orderBy:{

        createdAt:"desc"

      }

    });







    res.json({

      success:true,

      customers,

      policies,

      claims,

      agents,

      recentCustomers,

      recentPolicies,

      recentAgents

    });






  }

  catch(error){


    console.log(error);



    res.status(500).json({

      success:false,

      message:error.message

    });


  }


});



export default router;