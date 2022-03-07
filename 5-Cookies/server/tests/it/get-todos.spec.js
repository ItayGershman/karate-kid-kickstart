const { TestKit } = require("../TestKit");

describe("Todos test - GET endpoint", () => {
  const testKit = new TestKit();
  beforeAll(() => testKit.setup());
  afterAll(() => testKit.teardown());
  it("get all todos", async () => {
    //arrange
    const { appDriver } = testKit.drivers();
    //act
    const todos = await appDriver.getTodos();
    //expect
    expect(todos.data.length).toBe(0);
  });
});
