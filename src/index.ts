import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*", // ou ton domaine Angular
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
