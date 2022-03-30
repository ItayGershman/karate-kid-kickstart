import { TodoTypes } from "../../../common/index";
import { Item, ITodoApi } from "../interfaces/interfaces";


export interface MockTodoApi extends ITodoApi {
  getDefaultTodos: () => Item[],
  setTodos: (todos:Item[])=>void
}
export class MockTodosAPI implements MockTodoApi {
  private getTodosMockFN: jest.Mock = jest.fn();
  private addTodoMockFN: jest.Mock = jest.fn();
  private editTodoMockFN: jest.Mock = jest.fn();
  private removeTodoMockFN: jest.Mock = jest.fn();
  
  constructor(private todos: Item[] = []) {
    this.todos = todos;
  }

  getDefaultTodos = () =>{
    return this.todos
  }

  setTodos = (todos: Item[]) => {
    this.todos = [...this.todos, ...todos];
  };

  getTodos() {
    return this.getTodosMockFN.mockResolvedValue({ data: this.todos })();
  }
  addTodo(newTodo: Item) {
    return this.addTodoMockFN();
  }

  editTodo(newTodo: Item, id: string) {
    return this.editTodoMockFN();
  }

  removeTodo(id: TodoTypes.Guid) {
    return this.removeTodoMockFN();
  }
}
