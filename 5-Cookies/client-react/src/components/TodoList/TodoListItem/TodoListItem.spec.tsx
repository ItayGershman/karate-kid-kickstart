import { buildTodoItem } from "../../../test/utils";
import { TodoListItemDriver } from "./TodoListItem.driver";
import { waitFor } from "@testing-library/react";
import { Chance } from "chance";

describe("todo list item component", () => {
  let driver: TodoListItemDriver;
  const chance = new Chance();

  beforeEach(() => {
    driver = new TodoListItemDriver();
  });

  test("should display description text", async () => {
    const item = buildTodoItem();
    driver.given.item(item).when.render();

    expect(driver.get.todoText()).toEqual(item.text);
  });

  test("should verify that a new item status is unfinished by default", async () => {
    const item = buildTodoItem();
    driver.given.item(item).when.render();

    expect(driver.get.todoStatus()).toEqual(false);
  });

  test("should change todo text field to input field", async () => {
    driver.when.render().when.clickOnEditButton();

    expect(driver.get.editModeStatus()).toEqual(true);
  });

  test("should simulate user typing and verify text change after press on 'Enter'", async () => {
    const randomTodo = chance.string();

    driver.when.render().when.clickOnEditButton();
    for (let i = 0; i < randomTodo.length; ++i) {
      driver.when.setInputText(randomTodo[i]);
    }
    driver.when.pressEnter();

    waitFor(() => expect(driver.get.todoText()).toBe(randomTodo));
  });

  test("should remove an item when clicking the trash button", () => {
    const removeTodo: jest.Mock = jest.fn();
    const item = buildTodoItem();
    driver.given
      .item(item)
      .given.removeTodo(removeTodo)
      .when.render()
      .when.clickOnRemoveButton();

    expect(removeTodo).toHaveBeenCalledWith(item.id);
  });
});
