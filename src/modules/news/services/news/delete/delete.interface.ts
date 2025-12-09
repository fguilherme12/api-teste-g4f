export interface IDeleteService {
  execute(id: string): Promise<void>;
}

