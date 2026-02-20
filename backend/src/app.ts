import express from "express";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import boardRoute from "./routes/board.route.js";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/",authRoute)
app.use("/users",userRoute);
app.use("/boards",boardRoute)

export default app;