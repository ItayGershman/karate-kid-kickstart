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

  // test("should verify that a new item is un finished yet", async () => {
  //   const item = { text: chance.sentence()};
  //   driver.given.item(item).when.render()

  //   expect(driver.get.todoStatus()).toEqual(true);
  // });

  test("should display editMode status", async () => {
    driver.when.render();

    expect(driver.get.editModeStatus()).toEqual(false);
  });

  test("should change todo text field to input field", async () => {
    driver.when.render().when.clickOnEditButton();

    expect(driver.get.editModeStatus()).toEqual(true);
  });

  test("should change todo text", async () => {
    const randomTodo = chance.sentence();

    driver.when.render().when.clickOnEditButton();
    driver.when.setInputText(randomTodo);
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
    console.log("After click on remove button")
    expect(removeTodo).toHaveBeenCalledWith(item.id);
    // expect(driver.get.isItemOnScreen()).toEqual(false);
  });

  // test("should remove todo item from screen", () => {
  //   const removeTodo: jest.Mock = jest.fn();
  //   const item = buildTodoItem();
  //   driver.given.item(item).given.removeTodo(removeTodo);
  //   driver.given
  //     .item(item)
  //     .given.removeTodo(removeTodo)
  //     .when.render()
  //     .when.clickOnRemoveButton();

  //   expect(driver.get.isItemOnScreen()).toEqual(false);
  // });
});


