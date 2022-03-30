import { createContext } from "react";
import { ITodoApi } from "../interfaces/interfaces";
import { TodosAPI } from "../API/TodosAPI";

export const todosApi = new TodosAPI();
export const TodosApiContext = createContext<ITodoApi>(todosApi);