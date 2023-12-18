import express, { Request, Response, NextFunction } from "express";
import { connect } from "mongoose";
import taskRoutes from "./routes/tasks";
import userRoutes from "./routes/users";
import templateRoutes from "./routes/template";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/template", templateRoutes);

app.use("/tasks", taskRoutes);

app.use("/users", userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

connect("mongodb://127.0.0.1:27017").then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
