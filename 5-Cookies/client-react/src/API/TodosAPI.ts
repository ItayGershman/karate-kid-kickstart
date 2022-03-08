import axios from "axios";
import { TodoListItem } from "../interfaces/interfaces";

export class TodosAPI {
  url: string;
  constructor(url: string) {
    this.url = url;
  }
  getTodos() {
    return axios.get(`${this.url}/todos`);
  }
  addTodo(newTodo: TodoListItem) {
    return axios.post(`${this.url}/todos`, newTodo);
  }

  editTodo(newTodo: TodoListItem, id: string) {
    return axios.put(`${this.url}/todos/${id}`, { data: newTodo });
  }

  removeTodo(id: string) {
    return axios.delete(`${this.url}/todos/${id}`);
  }
}
