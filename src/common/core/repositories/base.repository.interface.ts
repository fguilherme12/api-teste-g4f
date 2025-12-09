export interface IBaseRepository<T> {
  create(data: any): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  findMany(options?: { where?: any; skip?: number; take?: number; orderBy?: any }): Promise<T[]>;
  count(where?: any): Promise<number>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<T>;
}

