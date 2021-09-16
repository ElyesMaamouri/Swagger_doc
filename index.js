// const express = require("express");
import express from "express";
//const cors = require("cors");
import cors from "cors";
//const morgan = require("morgan");
import morgan from "morgan";
//const low = require("lowdb");
import { Low, JSONFile } from "lowdb";
// const booksRouter = require("./routes/books");
import router from "./routes/books.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(options);

const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath("file://db.json", import.meta.url);
const file = dirname(__filename);
const adapter = new JSONFile(file);

const db = new Low(adapter);

db.write({ books: [] });

const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.db = db;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/books", router);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
