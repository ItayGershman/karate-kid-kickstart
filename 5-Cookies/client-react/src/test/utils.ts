import { v4 as uuidv4 } from "uuid";

export const mockTodo = () => {
  return {
    text: uuidv4().toString(),
    id: uuidv4(),
    isFinished: false,
  };
};

export const throwErrorOnMissingWrapper = () => {
  throw new Error("Component must be rendered before accessed!");
};
