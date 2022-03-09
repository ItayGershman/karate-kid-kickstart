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

  async getTodos() {
    return axios.get(`${this.url}/todos`, addCookieToEndPoint(this.userID));
  }
  createTodo(newTodo) {
    return axios.post(
      `${this.url}/todos`,
      newTodo,
      addCookieToEndPoint(this.userID)
    );
  }

  editTodo(newTodo, id) {
    const url = `${this.url}/todos/${id || ""}`;
    return axios.put(url, { data: newTodo }, addCookieToEndPoint(this.userID));
  }

  removeTodo(id) {
    const url = `${this.url}/todos/${id || ""}`;
    return axios.delete(url, addCookieToEndPoint(this.userID));
  }
}
