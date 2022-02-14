const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

let list = [
  {
    text: "Laundry 1",
    isFinished: false,
    id: "528dc789-c83a-4881-940e-f3cc73b92011",
  },
  {
    text: "Laundry",
    isFinished: true,
    id: "0c96740d-236a-4d03-bb17-f779f2d14525",
  },
];

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  //push req.body into list
  res.send(list);
});

app.post("/", (req, res) => {
  console.log("Add todo");
  console.log(req.body);
  list.push(req.body);
  res.send(list);
});
app.put("/:id", (req, res) => {
  console.log("update todo");
  console.log(req.params);
  console.log(req.body);
  list = list.map((todo) => {
    if (todo.id === req.params.id) return req.body.data;
    else return todo;
  });
  res.send(list);
});
app.delete("/:id", (req, res) => {
  list = list.filter(({id}) => id !== req.params.id)
  res.send(list);
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
