import { ITodoApi } from "../API/TodosAPI";
import { Item } from "../interfaces/interfaces";

export class MockTodosAPI implements ITodoApi {
  private todos: Item[] = [];
  private getTodosMockFN: jest.Mock = jest.fn();
  private addTodoMockFN: jest.Mock = jest.fn();
  private editTodoMockFN: jest.Mock = jest.fn();
  private removeTodoMockFN: jest.Mock = jest.fn();
  constructor(todos: Item[] = []) {
    this.todos = todos;
  }

  private mockAsyncResponse = (value: object) => {
    return this.getTodosMockFN().mockResolvedValue(value)();
  };

  setTodos = (todos: Item[]) => {
    this.todos = [...this.todos, ...todos];
  };

  getTodos() {
    return this.mockAsyncResponse({
      data: this.todos,
    });
  }
  addTodo(newTodo: Item) {
    return this.addTodoMockFN();
  }

  editTodo(newTodo: Item, id: string) {
    return this.editTodoMockFN();
  }

  removeTodo(id: string) {
    return this.removeTodoMockFN();
  }
}
