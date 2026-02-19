import express from "express";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import boardRoute from "./routes/board.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.json({message:"Mini trello app"})
});

app.use("/users",userRoute);
app.use("/boards",boardRoute)

export default app;