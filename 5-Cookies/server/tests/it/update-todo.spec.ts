const { TestKit } = require("../TestKit");
const { createMockTodo } = require("../utils/utils");

describe("Todos tests - PUT endpoint", () => {
  const testKit = new TestKit();
  beforeAll(() => testKit.setup());
  afterAll(() => testKit.teardown());
  it("Update a todo without id - should get 400 error", async () => {
    const { appDriver } = testKit.drivers();
    const newTodo = createMockTodo("create a todo");
    try {
      await appDriver.editTodo({ ...newTodo, text: "Upadte todo" }, "12");
    } catch (error) {
      expect(error.response.status).toBe(400);
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
