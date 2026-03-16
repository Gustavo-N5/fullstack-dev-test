import express from "express";
import dotenv from "dotenv";
import suggestionsRouter from "./routes/suggestions";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", suggestionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
