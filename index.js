import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


const todoList = [];

// Ana sayfa için route
app.get("/", (req, res) => {
  res.render("todo", { todoList });
});

// Yeni görev eklemek için POST route
app.post("/addTodo", (req, res) => {
  const newTodo = {
    task: req.body.task,
    status: "Devam Ediyor...",
  };
  todoList.push(newTodo);
  res.redirect("/");
});

// Görevi silmek için POST route
app.post("/deleteTodo", (req, res) => {
  const index = req.body.index;
  if (index >= 0 && index < todoList.length) {
    todoList.splice(index, 1);
  }
  res.redirect("/");
});

// Görevi tamamlamak için POST route
app.post("/finishTodo", (req, res) => {
  const index = req.body.index;
  if (index >= 0 && index < todoList.length) {
    todoList[index].status = "Tamamlandı";
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`ToDo uygulaması ${port} portunda çalışıyor.`);
});
