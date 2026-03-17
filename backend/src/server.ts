import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import suggestionsRouter from "./routes/suggestions";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", suggestionsRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger em http://localhost:${PORT}/docs`);
});