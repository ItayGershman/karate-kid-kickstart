import axios from "axios";

export class FetchAPI {
  constructor() {
    this.url = "http://localhost:3000";
  }
  getTodos() {
    console.log("GET todos");
    return axios
      .get(`${this.url}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
  addTodo(newTodo) {
    return axios.post(`${this.url}`, newTodo);
  }

  editTodo(newTodo, id) {
    return axios.put(`http://localhost:3000/${id}`, { data: newTodo });
  }

  removeTodo(id) {
    return axios.delete(`http://localhost:3000/${id}`);
  }
}
