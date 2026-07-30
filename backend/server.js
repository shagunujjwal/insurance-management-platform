import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";


dotenv.config();


const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// Upload folder access

app.use("/uploads", express.static("uploads"));



// Home Route

app.get("/", (req,res)=>{

  res.json({

    success:true,

    message:"Insurance Management Platform API is Running 🚀"

  });

});




// Routes

app.use("/api/auth", authRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/policies", policyRoutes);

app.use("/api/claims", claimRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/documents", documentRoutes);

app.use("/api/users", userRoutes);

app.use("/api/agents", agentRoutes);




// 404 Route

app.use((req,res)=>{

  res.status(404).json({

    success:false,

    message:"Route Not Found"

  });

});




// Server Start

const PORT = process.env.PORT ||5000 ;


app.listen(PORT,()=>{

  console.log(
    `Server running on https://insurance-management-platform-iem2.onrender.com${PORT}`
  );

});