import axios, { AxiosResponse } from "axios";
import { Guid } from "../../../common/interfaces/Todo";
import { Item } from "../interfaces/interfaces";

export interface ITodoApi {
  getTodos: () => Promise<AxiosResponse<any, any>> | Promise<any>;
  addTodo: (
    newTodo: Item
  ) => Promise<AxiosResponse<any, any>> | Promise<any>;
  editTodo: (
    newTodo: Item,
    id: Guid
  ) => Promise<AxiosResponse<any, any>> | Promise<any>;
  removeTodo: (
    id: Guid
  ) => Promise<AxiosResponse<any, any>> | Promise<any>;
}

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
