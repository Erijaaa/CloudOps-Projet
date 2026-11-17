import { NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PaginationQueryDto } from './dto/common.dto.js';

/**
 * Stockage en mémoire pour tester Swagger tout de suite.
 * À remplacer par Prisma / TypeORM : garder les mêmes noms de méthodes.
 */
export abstract class MemoryService<T extends { id: string }> {
  protected items: T[] = [];
  protected abstract readonly searchFields: string[];

  all(): T[] { return this.items; }

  findAll(query: PaginationQueryDto, filter: (item: T) => boolean = () => true) {
    const term = query.search?.toLowerCase();
    const list = this.items
      .filter(filter)
      .filter((i) => !term || this.searchFields.some((f) => String((i as unknown as Record<string, unknown>)[f] ?? '').toLowerCase().includes(term)));
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return {
      data: list.slice((page - 1) * limit, page * limit),
      meta: { total: list.length, page, limit, totalPages: Math.max(1, Math.ceil(list.length / limit)) },
    };
  }

  findOne(id: string): T {
    const item = this.items.find((i) => i.id === id);
    if (!item) throw new NotFoundException(`Ressource ${id} introuvable`);
    return item;
  }

  create(dto: object, extra: object = {}): T {
    const item = { id: randomUUID(), createdAt: new Date().toISOString(), ...dto, ...extra } as unknown as T;
    this.items.push(item);
    return item;
  }

  update(id: string, dto: object): T {
    return Object.assign(this.findOne(id), dto);
  }

  remove(id: string): void {
    this.findOne(id);
    this.items = this.items.filter((i) => i.id !== id);
  }
}
