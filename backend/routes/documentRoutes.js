import express from "express";
import multer from "multer";
import prisma from "../prisma/prismaClient.js";


const router = express.Router();


// File storage

const storage = multer.diskStorage({

  destination:(req,file,cb)=>{

    cb(null,"uploads/");

  },


  filename:(req,file,cb)=>{

    cb(null,Date.now()+"-"+file.originalname);

  }

});


const upload = multer({

  storage

});





// Get Documents

router.get("/",async(req,res)=>{


  const documents = await prisma.document.findMany({

    include:{
      customer:true
    }

  });


  res.json(documents);


});





// Add Document

router.post("/",upload.single("file"),async(req,res)=>{


  try{


    const document = await prisma.document.create({

      data:{

        customerId:Number(req.body.customerId),

        fileName:req.file.originalname,

        filePath:req.file.path

      }

    });


    res.json(document);



  }
  catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});





export default router;