import { KeyboardEvent } from "react";
import { Guid } from "../../../common/interfaces/Todo";

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
  dispatchEditTodo: (newTodo: Item, id: Guid, displayToaster?: boolean) => Promise<void>
}

export interface IAddItem {
  addTodo:(e: KeyboardEvent<HTMLInputElement>) => void;
  setNewTodo:React.Dispatch<React.SetStateAction<Item>>
}

export type DataHook = string