import axios from "axios";
import { TodoTypes } from "../../../common/index";
import { Item, ITodoApi } from "../interfaces/interfaces";

export class TodosAPI implements ITodoApi {
  getTodos() {
    return axios.get(`/todos`);
  }
  addTodo(newTodo: Item) {
    return axios.post(`/todos`, newTodo);
  }

  editTodo(newTodo: Item, id: TodoTypes.Guid) {
    return axios.put(`/todos/${id}`, { data: newTodo });
  }

  removeTodo(id: TodoTypes.Guid) {
    return axios.delete(`/todos/${id}`);
  }
}

export default {
  TodosAPI,
};
