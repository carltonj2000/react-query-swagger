import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import postRouter from "../Routes/posts";
import { options } from "./options";
import swaggerJSDoc from "swagger-jsdoc";

const PORT = process.env.PORT || 4001;
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/posts", postRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)));

app.listen(PORT, () => console.log("server listening on port", PORT));
