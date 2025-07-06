import express, { Application, Request, Response } from "express";
import { notesRoutes } from "./app/controllers/notes.controller";
import { usersRoutes } from "./app/controllers/user.controller";
import { model, Schema } from "mongoose";

const app: Application = express();

const noteSchema = new Schema({
  title: String,
  content: String,
});

const Note = model("Note", noteSchema);

app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Learning Mongoose",
    content: "I am learning Mongoose",
  });

  await myNote.save();
  res.status(201).json({
    success: true,
    message: "Note created successfuly",
    note: myNote,
  });
});

// app.use(express.json());

// app.use("/notes", notesRoutes);
// app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

export default app;

// mvc - model  , controller
