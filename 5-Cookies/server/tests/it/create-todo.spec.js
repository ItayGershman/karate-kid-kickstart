const { TestKit } = require("../TestKit");
const { createMockTodo } = require("../utils/utils");

describe("Todos tests - POST", () => {
  const testKit = new TestKit();
  beforeAll(() => testKit.setup());
  afterAll(() => testKit.teardown());
  afterEach(() => {
    const { mongoDBDriver } = testKit.drivers();
    mongoDBDriver.emptyDB();
  });
  it("create new todo with cookie appended to the request", async () => {
    const { appDriver, mongoDBDriver } = testKit.drivers();
    const newTodo1 = createMockTodo("test1");
    appDriver.setUserCookie(newTodo1.userID);
    await appDriver.createTodo(newTodo1);

    let todos = await mongoDBDriver.getTodos(newTodo1.userID);
    expect(todos[0].text).toBe("test1");
    expect(todos.length).toBe(1);
  });

  it("create new todo with cookie appended to only one new todo", async () => {
    const { appDriver, mongoDBDriver } = testKit.drivers();
    const newTodo1 = createMockTodo("test1");
    const newTodo2 = createMockTodo("test2");

    await appDriver.createTodo(newTodo1);
    appDriver.setUserCookie(newTodo2.userID);
    await appDriver.createTodo(newTodo2);
    let todos = await mongoDBDriver.getTodos(newTodo2.userID);

    expect(todos[0].text).toBe("test2");
    expect(todos.length).toBe(1);
  });
});
