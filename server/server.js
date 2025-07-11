import express from "express";
import http from "http";
import authRouter from "./routes/auth.js";
import cors from "cors";
import connectToDb from "./utils/connectToDb.js";
import cookieParser from 'cookie-parser';
const app = express();
const PORT = 3000;
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


app.use("/auth", authRouter);

const startServer = async () => {
  try {
    await connectToDb();
    server.listen(PORT, async () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("mongodb connection error", err);
    process.exit(1);
  }
};

startServer();
