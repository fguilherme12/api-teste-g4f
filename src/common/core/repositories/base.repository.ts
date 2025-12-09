import { PrismaService } from 'src/database/core/prisma.service';
import { IBaseRepository } from './base.repository.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected useSoftDelete: boolean;

  constructor(
    protected prisma: PrismaService,
    protected modelName: string,
    useSoftDelete: boolean = true,
  ) {
    this.useSoftDelete = useSoftDelete;
  }

  async create(data: any): Promise<T> {
    return this.prisma[this.modelName].create({ data });
  }

  async findById(id: string): Promise<T | null> {
    if (this.useSoftDelete) {
      return this.prisma[this.modelName].findFirst({
        where: { id, deletedAt: null },
      });
    }
    return this.prisma[this.modelName].findUnique({ where: { id } });
  }

  async findAll(): Promise<T[]> {
    if (this.useSoftDelete) {
      return this.prisma[this.modelName].findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });
    }
    return this.prisma[this.modelName].findMany();
  }

  async findMany(options?: { where?: any; skip?: number; take?: number; orderBy?: any }): Promise<T[]> {
    const where = this.useSoftDelete
      ? { ...options?.where, deletedAt: null }
      : options?.where;

    return this.prisma[this.modelName].findMany({
      where,
      skip: options?.skip,
      take: options?.take,
      orderBy: options?.orderBy || { createdAt: 'desc' },
    });
  }

  async count(where?: any): Promise<number> {
    const whereClause = this.useSoftDelete
      ? { ...where, deletedAt: null }
      : where;

    return this.prisma[this.modelName].count({ where: whereClause });
  }

  async update(id: string, data: any): Promise<T> {
    const updateData = { ...data };
    if (this.useSoftDelete) {
      updateData.updatedAt = new Date();
    }
    return this.prisma[this.modelName].update({ where: { id }, data: updateData });
  }

  async delete(id: string): Promise<T> {
    if (this.useSoftDelete) {
      return this.prisma[this.modelName].update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    }
    return this.prisma[this.modelName].delete({ where: { id } });
  }
}

