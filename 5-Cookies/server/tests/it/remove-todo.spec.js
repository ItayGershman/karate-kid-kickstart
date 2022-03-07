const { TestKit } = require("../TestKit");
const { createMockTodo } = require("../utils/utils");

describe("Todos tests - DELETE", () => {
  const testKit = new TestKit();
  beforeAll(() => testKit.setup());
  afterAll(() => testKit.teardown());
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
    }
  });

  it("Delete a todo", async () => {
    const { appDriver, mongoDBDriver } = testKit.drivers();
    const newTodo = createMockTodo("test1");

    appDriver.setUserCookie(newTodo.userID);
    await mongoDBDriver.createTodo(newTodo);

    try {
      const res = await appDriver.removeTodo(newTodo.id);
      expect(res.status).toBe(200);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
    const todos = await mongoDBDriver.getTodos(newTodo.userID);
    expect(todos.length).toBe(0);
  });
});
