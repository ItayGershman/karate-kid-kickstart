import { errorMessages } from "../../../common/errorMessages";
import { TestKit } from "../TestKit";
import { createMockTodo } from "../utils/utils";

describe("PUT /todos", () => {
  const testKit = new TestKit();
  testKit.beforeAndAfter()
  it("Update a todo without id - should get 400 error", async () => {
    const { appDriver } = testKit.drivers();
    const newTodo = createMockTodo("create a todo");
    try {
      await appDriver.editTodo({ ...newTodo, text: "Upadte todo" }, "12");
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(errorMessages.statusCode400.updateItemMsg)
    }
  });
  it("update a todo", async () => {
    const { appDriver, mongoDBDriver } = testKit.drivers();
    const newTodo = createMockTodo("create a todo");
    appDriver.setUserCookie(newTodo.userID);
    await mongoDBDriver.createTodo(newTodo);

    const editResponse = await appDriver.editTodo(
      { ...newTodo, text: "Upadted todo" },
      `${newTodo.id}`
    );
    expect(editResponse.status).toBe(200);

    const todos = await mongoDBDriver.getTodos(newTodo.userID);
    expect(todos[0].text).toBe("Upadted todo");
    expect(todos.length).toBe(1);
  });
});
