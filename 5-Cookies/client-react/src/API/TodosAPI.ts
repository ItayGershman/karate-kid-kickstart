import axios from "axios";
import { Item } from "../interfaces/interfaces";

export class TodosAPI {
  getTodos() {
    return axios.get(`/todos`);
  }
  addTodo(newTodo: Item) {
    return axios.post(`/todos`, newTodo);
  }

  editTodo(newTodo: Item, id: string) {
    return axios.put(`/todos/${id}`, { data: newTodo });
  }

  removeTodo(id: string) {
    return axios.delete(`/todos/${id}`);
  }
}
