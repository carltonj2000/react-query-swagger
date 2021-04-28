import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import postRouter from "../Routes/posts";

const PORT = process.env.PORT || 4001;
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/posts", postRouter);

app.listen(PORT, () => console.log("server listening on port", PORT));
