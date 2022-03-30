import { createContext } from "react";
import { ITodoApi } from "../../interfaces/interfaces";
import { TodosAPI } from "../TodosAPI";

export const todosApi = new TodosAPI();
export const TodosApiContext = createContext<ITodoApi>(todosApi);