import { v4 as uuidv4 } from "uuid";

function makeRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const createMockTodo = (text) => {
  return {
    text,
    isFinished: false,
    id: makeRandomString(8),
    userID: uuidv4(),
  };
};
