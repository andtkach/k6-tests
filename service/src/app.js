import express from 'express';
import { requestLogger } from './middleware/requestLogger.js';
import { createBooksRouter } from './routes/books.js';
import { createSystemRouter } from './routes/system.js';
import { BooksStore } from './store/booksStore.js';

export function createApp() {
  const app = express();
  app.use(requestLogger);
  app.use(express.json());

  const store = new BooksStore();
  app.use('/books', createBooksRouter({ store }));
  app.use(createSystemRouter());

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    const status = Number(err?.status ?? 500);
    const message = err?.message ?? 'Internal Server Error';
    res.status(status).json({ error: message });
  });

  return app;
}

