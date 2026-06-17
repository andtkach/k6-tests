import { Mutex } from 'async-mutex';
import { randomUUID } from 'node:crypto';

/**
 * Thread-safe (mutex-guarded) in-memory books store.
 * This makes concurrent async access atomic within a single Node process.
 */
export class BooksStore {
  #mutex = new Mutex();
  /** @type {Map<string, {id: string, title: string, author: string, year?: number, createdAt: string, updatedAt: string}>} */
  #books = new Map();

  async list() {
    return this.#mutex.runExclusive(() => Array.from(this.#books.values()));
  }

  async get(id) {
    return this.#mutex.runExclusive(() => this.#books.get(id) ?? null);
  }

  async create({ title, author, year }) {
    return this.#mutex.runExclusive(() => {
      const now = new Date().toISOString();
      const book = {
        id: randomUUID(),
        title,
        author,
        ...(year === undefined ? {} : { year }),
        createdAt: now,
        updatedAt: now
      };
      this.#books.set(book.id, book);
      return book;
    });
  }

  async update(id, { title, author, year }) {
    return this.#mutex.runExclusive(() => {
      const existing = this.#books.get(id);
      if (!existing) return null;

      const updated = {
        ...existing,
        ...(title === undefined ? {} : { title }),
        ...(author === undefined ? {} : { author }),
        ...(year === undefined ? {} : { year }),
        updatedAt: new Date().toISOString()
      };

      this.#books.set(id, updated);
      return updated;
    });
  }

  async delete(id) {
    return this.#mutex.runExclusive(() => this.#books.delete(id));
  }
}

