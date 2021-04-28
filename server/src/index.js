import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import postRouter from "./routes/posts";
import bookRouter from "./routes/books";
import { options } from "./options";

const db = low(new FileSync("../db.json"));
db.defaults({ books: [] }).write();

const PORT = process.env.PORT || 4001;
dotenv.config();

const app = express();
app.db = db;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/posts", postRouter);
app.use("/books", bookRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)));

app.listen(PORT, () => console.log("server listening on port", PORT));
