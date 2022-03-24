import { KeyboardEvent } from "react";

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
}

export interface IAddItem {
  addTodo:(e: KeyboardEvent<HTMLInputElement>) => void;
  setNewTodo:React.Dispatch<React.SetStateAction<Item>>
}

export interface Guid {}