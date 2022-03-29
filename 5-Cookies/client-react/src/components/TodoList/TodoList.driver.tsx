import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import TodoList from "./TodoList";
import dataHooks from "../../dataHooks/dataHooks";
import {
  errorOnMissingWrapper,
  getElementByHookName,
  handleKeyPress,
} from "../../test/utils";
import { TodosApiContext } from "../../../App";
import { MockTodosAPI } from "../../test/MockTodosApi";

const mockTodosApi = new MockTodosAPI();

export class TodoListDriver {
  private wrapper: RenderResult | undefined;

  private getTextInputElem = () => {
    return getElementByHookName(this.wrapper, dataHooks.addItem);
  };

  private isItemExist = (text: string) => {
    if (!this.wrapper) throw errorOnMissingWrapper();
    const allTodos = this.wrapper.getAllByTestId(dataHooks.todoText);
    if (allTodos) {
      const found = allTodos?.find((todo) => todo.innerHTML === text);
      return !!found;
    }
    return false;
  };

  when = {
    render: () => {
      this.wrapper = render(
        <TodosApiContext.Provider value={mockTodosApi}>
          <TodoList />
        </TodosApiContext.Provider>
      );
      return this;
    },
    setInputText: (text: string) => {
      const textInput = this.getTextInputElem();
      if (textInput !== null) {
        fireEvent.change(textInput, { target: { value: text } });
      }
      return this;
    },
    pressEnter: () => {
      const textInput = this.getTextInputElem();
      if (textInput) {
        handleKeyPress(textInput);
      }
      return this;
    },
  };

  get = {
    isItemExist: (text: string) => this.isItemExist(text),
  };
}
