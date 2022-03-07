import { TestKit } from "../TestKit";

describe("Todos test - GET endpoint", () => {
  const testKit = new TestKit();
  testKit.beforeAndAfter()
  it("get all todos", async () => {
    const { appDriver } = testKit.drivers();
    const todos = await appDriver.getTodos();
    expect(todos.data.length).toBe(0);
  });
});
