import { News } from "../../../types/news.types";

export interface IListService {
  execute(): Promise<News[]>;
}

