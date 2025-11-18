import express from "express";

const router = express.Router();
/**
 *
 * @openapi
 * /users:
 *  get:
 *      summary: Get all users
 *      responses:
 *          200:
 *          description: List of users
 */
router.get("/users", (req, res) => {
  res.json([{ id: 1, name: "John" }]);
});
