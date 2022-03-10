import { v4 as uuidv4 } from "uuid";

export const createMockTodo = (text) => ({
  text,
  isFinished: false,
  id: uuidv4(),
  userID: uuidv4(),
});

export const generateID = () => uuidv4().toString();

export const addCookieToEndPoint = (id) =>
  id && { headers: { Cookie: `userID=${id};` } };


