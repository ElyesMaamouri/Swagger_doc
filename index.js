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

const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath("file://db.json", import.meta.url);
const file = dirname(__filename);
const adapter = new JSONFile(file);

const db = new Low(adapter);

db.write({ books: [] });

const app = express();

app.db = db;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/books", router);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
