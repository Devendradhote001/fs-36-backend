import express from "express";
import postRoutes from "./routes/post.routes.js";

const app = express();

app.use(express.json());

app.use("/api/post", postRoutes);

export default app;
