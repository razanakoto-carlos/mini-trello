import "dotenv/config"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import boardRoute from "./routes/board.route.js";
import authRoute from "./routes/auth.route.js";
import cardRoute from "./routes/card.route.js";

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api/boards",boardRoute);
app.use("/api/cards",cardRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log(`Server running on http://localhost:${PORT}`);
})