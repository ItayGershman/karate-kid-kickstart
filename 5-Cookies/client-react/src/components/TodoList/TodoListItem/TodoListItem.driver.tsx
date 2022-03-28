import React from "react";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import TodoListItem from "./TodoListItem";
import dataHooks from "../../../dataHooks/dataHooks";
import {
  buildTodoItem,
  errorOnMissingWrapper,
  isElementExist,
} from "../../../test/utils";
import { DataHook, Item } from "../../../interfaces/interfaces";

export class TodoListItemDriver {
  private todoItem: Item = buildTodoItem();
  private removeTodoMock: jest.Mock = jest.fn();
  private dispatchEditTodo: jest.Mock = jest.fn();
  private wrapper?: RenderResult;

  private getElementByHookName = (hook: DataHook) => {
    if (!this.wrapper) throw errorOnMissingWrapper();
    return this.wrapper.getByTestId(hook);
  };

  private buttonClickHandler = (dataHook: string) => {
    const buttonElem = this.getElementByHookName(dataHook);
    if (buttonElem !== null) fireEvent.click(buttonElem);
  };

  private getTodoText = () => {
    return this.getElementByHookName(dataHooks.todoText).innerHTML;
  };

  private getTodoStatus = (): boolean => {
    const switchElem = this.getElementByHookName(
      dataHooks.todoToggleSwitch
    ) as HTMLInputElement;
    return switchElem.checked;
  };

  private getEditModeStatus = (): boolean => {
    if (!this.wrapper) throw errorOnMissingWrapper();
    return isElementExist(this.wrapper, dataHooks.editTodoItem);
  };

  private getTodoItemFromScreen = (): boolean => {
    if (!this.wrapper) throw errorOnMissingWrapper();
    return isElementExist(this.wrapper, dataHooks.todoItem);
  };

  given = {
    item: (item: Partial<Item>) => {
      this.todoItem = { ...this.todoItem, ...item };
      return this;
    },
    removeTodo: (cb: jest.Mock) => {
      this.removeTodoMock = cb;
      return this;
    },
  };

  when = {
    render: () => {
      this.wrapper = render(
        <TodoListItem
          item={this.todoItem}
          removeTodo={this.removeTodoMock}
          dispatchEditTodo={this.dispatchEditTodo}
        />
      );
      return this;
    },
    clickOnEditButton: () => {
      this.buttonClickHandler(dataHooks.editIconButton);
      return this;
    },
    clickOnRemoveButton: () => {
      this.buttonClickHandler(dataHooks.removeIconButton);
      return this;
    },
    clickOnToggleButton: () => {
      this.buttonClickHandler(dataHooks.todoToggleSwitch);
      return this;
    },
    setInputText: (text: string) => {
      const textInput = this.getElementByHookName(dataHooks.editTodoItem);
      if (textInput !== null) {
        fireEvent.change(textInput, { target: { value: text } });
      }
      return this;
    },
    pressEnter: () => {
      const textInput = this.getElementByHookName(dataHooks.editTodoItem);
      if (textInput) {
        fireEvent.keyPress(textInput, {
          key: "Enter",
          code: "Enter",
          charCode: 13,
        });
      }
    },
  };

  get = {
    todoText: () => this.getTodoText(),
    todoStatus: () => this.getTodoStatus(),
    editModeStatus: () => this.getEditModeStatus(),
    isItemOnScreen: () => this.getTodoItemFromScreen(),
  };
}
