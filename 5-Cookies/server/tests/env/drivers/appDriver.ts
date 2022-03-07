import axios from "axios";

export class AppDriver {
  url;
  userID;
  constructor(url: string) {
    this.url = url;
  }

  setUserCookie(userID: string) {
    this.userID = userID;
  }
  clearUserCookie() {
    this.userID = undefined;
  }

  async getTodos() {
    return axios.get(
      `${this.url}/todos`,
      this.userID && {
        headers: {
          Cookie: `userID=${this.userID};`,
        },
      }
    );
  }
  createTodo(newTodo) {
    return axios.post(
      `${this.url}/todos`,
      newTodo,
      this.userID && {
        headers: {
          Cookie: `userID=${this.userID};`,
        },
      }
    );
  }

  editTodo(newTodo, id) {
    const url = `${this.url}/todos/${id || ""}`
    return axios.put(
      url,
      { data: newTodo },
      this.userID && {
        headers: {
          Cookie: `userID=${this.userID};`,
        },
      }
    );
  }

  removeTodo(id) {
    return axios.delete(
      `${this.url}/todos/${id}`,
      this.userID && {
        headers: {
          Cookie: `userID=${this.userID};`,
        },
      }
    );
  }
}
