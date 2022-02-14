const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

let list = [];

app.get("/", (req, res) => {
  res.send(list);
});

app.post("/", (req, res) => {
  list.push(req.body);
  res.send(list);
});
app.put("/:id", (req, res) => {
  list = list.map((todo) => {
    if (todo.id === req.params.id) return req.body.data;
    else return todo;
  });
  res.send(list);
});
app.delete("/:id", (req, res) => {
  list = list.filter(({ id }) => id !== req.params.id);
  res.send(list);
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
