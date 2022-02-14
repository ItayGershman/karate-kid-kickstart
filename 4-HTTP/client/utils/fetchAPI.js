import axios from "axios";

export class FetchAPI {
  constructor() {
    this.url = "http://localhost:3000";
  }
  getTodos() {
    return axios.get(`${this.url}`);
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
