import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import TodoList from "./TodoList";
import dataHooks from "../../dataHooks/dataHooks";
import {
  errorOnMissingWrapper,
  getAllByHookName,
  getElementByHookName,
  handleKeyPress,
} from "../../test/utils";
import { TodosApiContext } from "../../../App";
import { MockTodoApi, MockTodosAPI } from "../../test/MockTodosApi";
import { Item } from "../../interfaces/interfaces";

export class TodoListDriver {
  private wrapper: RenderResult | undefined;
  private mockTodosApi: MockTodoApi = new MockTodosAPI();

  private getTextInputElem = () => {
    return getElementByHookName(this.wrapper, dataHooks.addItem);
  };

  private isItemExist = (text: string) => {
    if (!this.wrapper) throw errorOnMissingWrapper();
    const allTodos = getAllByHookName(this.wrapper, dataHooks.todoText);
    if (allTodos) {
      const found = allTodos?.find((todo) => todo.innerHTML === text);
      return !!found;
    }
    return false;
  };

  private getTodosFromScreen = () => {
    if (!this.wrapper) throw errorOnMissingWrapper();
    const allTodos = getAllByHookName(this.wrapper, dataHooks.todoText);
    const todos = this.mockTodosApi.getDefaultTodos();
    const filteredTodos = allTodos.filter((todo, i) => {
      return todo.innerHTML === todos[i].text;
    });
    return filteredTodos.length === allTodos.length;
  };

  given = {
    InitialTodos: (todos: Item[]) => {
      this.mockTodosApi.setTodos(todos);
      return this;
    },
  };

  when = {
    render: () => {
      this.wrapper = render(
        <TodosApiContext.Provider value={this.mockTodosApi}>
          <TodoList />
        </TodosApiContext.Provider>
      );
      return this;
    },
    setInputText: (text: string) => {
      const textInput = this.getTextInputElem();
      if (textInput !== null)
        fireEvent.change(textInput, { target: { value: text } });
      return this;
    },
    pressEnter: () => {
      const textInput = this.getTextInputElem();
      if (textInput) handleKeyPress(textInput);
      return this;
    },
  };

  get = {
    isItemExist: (text: string) => this.isItemExist(text),
    isTodosExist: () => this.getTodosFromScreen(),
  };
}
