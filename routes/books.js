import express from "express";
const router = express.Router();
import { nanoid } from "nanoid";

const idLength = 8;
// Definition Schemas
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: 123456
 *         title: New book
 *         author: new user
 */

// Tags

/**
 * @swagger
 * tags :
 *  name : Books
 *  description : the book api
 */

// Get books

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

//$ref : '#/components/schemas/Book' c'est la reference au schemas defini en haut
router.get("/", (req, res) => {
  const books = req.app.db.get("books");
  res.send(books);
});

router.get("/:id", (req, res) => {
  const book = req.app.db.get("books").find({ id: req.params.id }).value();
  res.send(book);
});

router.post("/", (req, res) => {
  try {
    const book = {
      id: nanoid(idLength),
      ...req.body,
    };
    req.app.db.get("books").push(book).write();
  } catch (error) {
    return res.status(500).send(eroor);
  }
});

router.put("/:id", (req, res) => {
  try {
    req.app.db
      .get("books")
      .find({ id: req.params.id })
      .assign(req.body)
      .write();
    res.send(req.app.db.get("books").find({ id: req.params.id }));
  } catch (err) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", (req, res) => {
  req.app.db.get("books".remove({ id: req.params.id })).write();
  res.sendStatus(200);
});

export default router;
