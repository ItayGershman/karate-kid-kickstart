import { errorMessages } from "../../../common/errorMessages";
import { TestKit } from "../TestKit";
import { createMockTodo } from "../utils/utils";

describe("DELETE /todos", () => {
  const testKit = new TestKit();
  testKit.beforeAndAfter()
  afterEach(() => {
    const { mongoDBDriver } = testKit.drivers();
    mongoDBDriver.emptyDB();
  });
  it("Delete todo with incorrect id", async () => {
    const { appDriver } = testKit.drivers();
    try {
      await appDriver.removeTodo("1");
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(errorMessages.statusCode400.deleteItemMsg);
    }
  });

  it("Delete a todo", async () => {
    const { appDriver, mongoDBDriver } = testKit.drivers();
    const newTodo = createMockTodo("test1");
    appDriver.setUserCookie(newTodo.userID);
    await mongoDBDriver.createTodo(newTodo);

    const res = await appDriver.removeTodo(newTodo.id);
    expect(res.status).toBe(200);

    const todos = await mongoDBDriver.getTodos(newTodo.userID);
    expect(todos.length).toBe(0);
  });
});
