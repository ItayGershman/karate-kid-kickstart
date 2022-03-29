import { buildTodoItem } from "../../test/utils";
import { TodoListDriver } from "./TodoList.driver";
import { waitFor } from "@testing-library/react";
import { Chance } from "chance";

describe("todo list item component", () => {
  let driver: TodoListDriver;
  const chance = new Chance();

  beforeEach(() => {
    driver = new TodoListDriver();
  });

  test.only("should add a todo", async () => {
    const firstTodo = chance.string();
    const secondTodo = chance.string();
    driver.when
      .render()
      .when.setInputText(firstTodo)
      .when.pressEnter()
      .when.setInputText(secondTodo)
      .when.pressEnter();

    await waitFor(() => {
      expect(driver.get.isItemExist(firstTodo)).toEqual(true);
    });
  });
});
