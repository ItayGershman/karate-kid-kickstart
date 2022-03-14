import { v4 as uuidv4 } from "uuid";

export const initTodo = () => ({ text: "", isFinished: false, id: uuidv4() });
