import React from "react";
import {
  render,
  configure,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import TodoListItem from "./TodoListItem";
import { Item } from "../../../interfaces/interfaces";
import { BaseDriver } from "../../../test/baseDriver";
import dataHooks from "../../../dataHooks/dataHooks";

export const mockTodo = () => {
  return {
    text: "todo",
    id: "1",
    isFinished: false,
  };
};
configure({ testIdAttribute: "data-hook" });

const throwErrorOnMissingWrapper = () => {
  throw new Error("Component must be rendered before accessed!");
};

export class TodoListItemDriver extends BaseDriver {
  private todoItem: Item = mockTodo();
  private removeTodo: jest.Mock = jest.fn();

  given = {
    item: (item: Partial<Item>) => {
      this.todoItem = { ...this.todoItem, ...item };
      return this.given;
    },
    removeTodo: (cb: jest.Mock) => {
      this.removeTodo = cb;
      return this.given;
    },
  };

  when = {
    render: () => {
      this.wrapper = render(
        <TodoListItem item={this.todoItem} removeTodo={this.removeTodo} />
      );
      return this.when;
    },
    editButtonClick: async () => {
      if (!this.wrapper) return throwErrorOnMissingWrapper();
      const editButton = await this.wrapper.getByTestId(
        dataHooks.editIconButton
      );
      fireEvent.click(editButton);
      return editButton;
    },
    removeButtonClick: async () => {
      if (!this.wrapper) return throwErrorOnMissingWrapper();
      (await this.wrapper.findByTestId(dataHooks.removeIconButton)).click();
      return this.when;
    },
  };

  get = {
    todoText: () => this.todoItem.text,
    todoStatus: () => this.todoItem.isFinished,
    editModeStatus: async () => {
      if (!this.wrapper) return throwErrorOnMissingWrapper();
      if (!this.wrapper) return throwErrorOnMissingWrapper();
      try {
        await this.wrapper.getByTestId(dataHooks.editTodoItem);
        return true;
      } catch (error) {
        return false;
      }
    },
  };
}
