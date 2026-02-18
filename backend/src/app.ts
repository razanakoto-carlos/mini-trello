import express from "express";
import cors from "cors";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.json({message:"Mini trello app"})
});

app.use("/users",userRoute);

export default app;