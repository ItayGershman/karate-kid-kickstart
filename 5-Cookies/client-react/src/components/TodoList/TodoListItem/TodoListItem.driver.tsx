import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoListItem from "./TodoListItem";
import { BaseDriver } from "../../../test/baseDriver";
import dataHooks from "../../../dataHooks/dataHooks";
import { mockTodo, throwErrorOnMissingWrapper } from "../../../test/utils";
import { Item } from "../../../interfaces/interfaces";

export class TodoListItemDriver extends BaseDriver {
  private todoItem: Item = mockTodo();
  private removeTodo: jest.Mock = jest.fn();

  private buttonClickHandler = (dataHook: string) => {
    if (!this.wrapper) return throwErrorOnMissingWrapper();
    const buttonElem = this.wrapper.getByTestId(dataHook);
    fireEvent.click(buttonElem);
    return buttonElem;
  };

  private getTodoText = () => {
    return this.wrapper?.getByText(this.todoItem.text).innerHTML;
  };

  private getTodoStatus = () => {
    const switchElem = this.wrapper?.getByTestId(
      dataHooks.todoToggleSwitch
    ) as HTMLInputElement;
    return switchElem.checked;
  };

  private getEditModeStatus = () => {
    if (!this.wrapper) return throwErrorOnMissingWrapper();
    try {
      if (this.wrapper.getByTestId(dataHooks.editTodoItem)) return true;
    } catch (error) {
      return false;
    }
  };

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
    editButtonClick: () => this.buttonClickHandler(dataHooks.editIconButton),
    removeButtonClick: () => this.buttonClickHandler(dataHooks.removeIconButton),
  };

  get = {
    todoText: () => this.getTodoText(),
    todoStatus: () => this.getTodoStatus(),
    editModeStatus: () => this.getEditModeStatus(),
  };
}
