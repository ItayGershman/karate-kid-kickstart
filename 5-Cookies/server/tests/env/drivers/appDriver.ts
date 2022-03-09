import axios from "axios";
import { addCookieToEndPoint } from "../../utils/utils";

export class AppDriver {
  userID: string;
  constructor(private url: string) {}

  setUserCookie(userID: string) {
    this.userID = userID;
  }
  clearUserCookie() {
    this.userID = undefined;
  }

  private todosURL = (id: string = "") => {
    return `${this.url}/todos/${id}`;
  };

  async getTodos() {
    return axios.get(this.todosURL(), addCookieToEndPoint(this.userID));
  }
  createTodo(newTodo) {
    return axios.post(
      this.todosURL(),
      newTodo,
      addCookieToEndPoint(this.userID)
    );
  }

  editTodo(newTodo, id) {
    return axios.put(
      this.todosURL(id),
      { data: newTodo },
      addCookieToEndPoint(this.userID)
    );
  }

  removeTodo(id) {
    return axios.delete(this.todosURL(id), addCookieToEndPoint(this.userID));
  }
}
