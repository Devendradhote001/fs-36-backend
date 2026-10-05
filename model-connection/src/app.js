import express from "express";
import userRoutes from "./routes/user.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import postRoutes from "./routes/post.routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);

export default app;
