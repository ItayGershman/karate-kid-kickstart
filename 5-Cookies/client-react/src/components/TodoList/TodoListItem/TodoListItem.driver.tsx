import React from "react"
import {
  render,
  fireEvent,
  RenderResult,
  BoundFunctions,
} from "@testing-library/react"
import TodoListItem from "./TodoListItem"
import dataHooks from "../../../dataHooks/dataHooks"
import {
  buildTodoItem,
  errorOnMissingWrapper,
  getElementByHookName,
  handleKeyPress,
  isElementExist,
} from "../../../test/utils"
import { Item } from "../../../interfaces/interfaces"

export class TodoListItemDriver {
  private todoItem: Item = buildTodoItem()
  private removeTodoMock: jest.Mock = jest.fn()
  private dispatchEditTodo: jest.Mock = jest.fn()
  private wrapper: RenderResult | undefined

  constructor(wrapper?: RenderResult | any) {
    this.wrapper = wrapper
  }

  private buttonClickHandler = (dataHook: string) => {
    const buttonElem = getElementByHookName(this.wrapper, dataHook)
    if (buttonElem !== null) fireEvent.click(buttonElem)
  }

  private getTodoText = () => {
    return getElementByHookName(this.wrapper, dataHooks.todoText).innerHTML
  }

  private getTodoStatus = (): boolean => {
    const switchElem = getElementByHookName(
      this.wrapper,
      dataHooks.todoToggleSwitch
    ) as HTMLInputElement
    return switchElem.checked
  }

  private getEditModeStatus = (): boolean => {
    if (!this.wrapper) throw errorOnMissingWrapper()
    return isElementExist(this.wrapper, dataHooks.editTodoItem)
  }

  private getTodoItemFromScreen = (): boolean => {
    if (!this.wrapper) throw errorOnMissingWrapper()
    return isElementExist(this.wrapper, dataHooks.todoItem)
  }

  private getTextInputElem = () => {
    return getElementByHookName(this.wrapper, dataHooks.editTodoItem)
  }

  given = {
    item: (item: Partial<Item>) => {
      this.todoItem = { ...this.todoItem, ...item }
      return this
    },
    removeTodo: (cb: jest.Mock) => {
      this.removeTodoMock = cb
      return this
    },
  }

  when = {
    render: () => {
      this.wrapper = render(
        <TodoListItem
          item={this.todoItem}
          removeTodo={this.removeTodoMock}
          dispatchEditTodo={this.dispatchEditTodo}
        />
      )
      return this
    },
    clickOnEditButton: () => {
      this.buttonClickHandler(dataHooks.editIconButton)
      return this
    },
    clickOnRemoveButton: () => {
      this.buttonClickHandler(dataHooks.removeIconButton)
      return this
    },
    clickOnToggleButton: () => {
      this.buttonClickHandler(dataHooks.todoToggleSwitch)
      return this
    },
    setInputText: (text: string) => {
      const textInput = this.getTextInputElem()
      if (textInput !== null) {
        fireEvent.change(textInput, { target: { value: text } })
      }
      return this
    },
    pressEnter: () => {
      const textInput = this.getTextInputElem()
      if (textInput !== null) {
        handleKeyPress(textInput)
      }
    },
  }

  get = {
    todoText: () => this.getTodoText(),
    todoStatus: () => this.getTodoStatus(),
    editModeStatus: () => this.getEditModeStatus(),
    // isItemOnScreen: () => this.getTodoItemFromScreen(),
  }
}
