export interface ITodo {
  text: string;
  isFinished: boolean;
  id: string;
  userID: string;
}

export interface ITodoDB {
  getTodos: (userID: string) => void;
  createTodo: (todo: ITodo) => void;
  updateTodo: (todo: ITodo, id: string) => void;
  removeTodo: (id: string) => void;
}
