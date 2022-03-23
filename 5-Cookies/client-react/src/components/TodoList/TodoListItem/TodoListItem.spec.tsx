import { mockTodo, TodoListItemDriver } from "./TodoListItem.driver";

describe("todo list item component", () => {
  let driver : TodoListItemDriver;

  beforeEach(() => {
    driver = new TodoListItemDriver();
  });

  test("should display description text", async () => {
    const item = { text: "test" };
    driver.given.item(item);

    driver.when.render();

    expect(driver.get.todoText()).toEqual(item.text);
  });


  test("should display switchMode status", async () => {
    driver.when.render();

    expect(driver.get.todoStatus()).toEqual(false);
  });


  // test("should display editMode status", async () => {
  //   const removeTodo: jest.Mock = jest.fn();
  //   const item = mockTodo();
  //   driver.given.item(item).removeTodo(removeTodo);

  //   driver.when.render();

  //   expect(driver.get.editModeStatus()).toEqual(false);
  // });


  test("should change editMode status to true", async () => {
    driver.when.render(); 
    await driver.when.editButtonClick();
    expect(await driver.get.editModeStatus()).toBeTruthy();
  });


  // test("should remove todo item from screen", async () => {
  //   const removeTodo: jest.Mock = jest.fn();
  //   const item = mockTodo();
  //   driver.given.item(item).removeTodo(removeTodo);

  //   driver.when.render();
  //   driver.when.removeButtonClick();

  //   expect(removeTodo).toHaveBeenCalledWith(item.id);
  //   expect(removeTodo).toHaveBeenCalled();
  // });
});
