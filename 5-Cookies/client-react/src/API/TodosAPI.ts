import axios, { AxiosResponse } from "axios";
import { Guid } from "../../../common/interfaces/Todo";
import { Item, ITodoApi } from "../interfaces/interfaces";

export class TodosAPI implements ITodoApi {
  getTodos() {
    return axios.get(`/todos`);
  }
  addTodo(newTodo: Item) {
    return axios.post(`/todos`, newTodo);
  }

  editTodo(newTodo: Item, id: Guid) {
    return axios.put(`/todos/${id}`, { data: newTodo });
  }

  removeTodo(id: Guid) {
    return axios.delete(`/todos/${id}`);
  }
}

export default {
  TodosAPI,
};
