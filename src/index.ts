import express from "express";
import { type Express } from "express";
import dotenv from "dotenv";
//@ts-ignore It exists, stop being so noisy
import { swaggerSpec, swaggerUi } from "./config/swagger.ts";

dotenv.config();
const PORT = 3000;
const app: Express = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

export default app;
