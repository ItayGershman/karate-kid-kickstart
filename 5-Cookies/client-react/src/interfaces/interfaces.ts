import { AxiosResponse } from "axios";
import { KeyboardEvent } from "react";
import { TodoTypes } from "../../../common/index";

export type DataHook = string;

export type Item = {
  text: string;
  isFinished: boolean;
  id: string;
};

export interface TodoListItem {
  item: Item;
}

export interface ITodoItem {
  item: Item;
  removeTodo: (itemID: string) => void;
  dispatchEditTodo: (
    newTodo: Item,
    id: TodoTypes.Guid,
    displayToaster?: boolean
  ) => Promise<void>;
}

export interface IAddItem {
  addTodo: (e: KeyboardEvent<HTMLInputElement>) => void;
  setNewTodo: React.Dispatch<React.SetStateAction<Item>>;
  dataHook: DataHook;
}

export interface ITodoApi {
  getTodos: () => Promise<AxiosResponse<any, any>> | Promise<any>;
  addTodo: (newTodo: Item) => Promise<AxiosResponse<any, any>> | Promise<any>;
  editTodo: (
    newTodo: Item,
    id: TodoTypes.Guid
  ) => Promise<AxiosResponse<any, any>> | Promise<any>;
  removeTodo: (
    id: TodoTypes.Guid
  ) => Promise<AxiosResponse<any, any>> | Promise<any>;
}
