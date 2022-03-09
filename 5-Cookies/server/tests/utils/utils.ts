import { v4 as uuidv4 } from "uuid";
import { Chance } from "chance";

export const createMockTodo = (text) => {
  return {
    text,
    isFinished: false,
    id: Chance().string(),
    userID: uuidv4(),
  };
};

export const addCookieToEndPoint = (id) =>
  id && {
    headers: {
      Cookie: `userID=${id};`,
    },
  };


