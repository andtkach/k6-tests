import express from 'express';

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function parseYear(raw) {
  if (raw === undefined) return undefined;
  if (raw === null) throw httpError(400, '`year` must be a number');
  if (typeof raw !== 'number' || !Number.isFinite(raw)) throw httpError(400, '`year` must be a number');
  const year = Math.trunc(raw);
  if (year < 0 || year > 9999) throw httpError(400, '`year` must be between 0 and 9999');
  return year;
}

function parseNonEmptyString(field, raw, { optional }) {
  if (raw === undefined && optional) return undefined;
  if (typeof raw !== 'string') throw httpError(400, `\`${field}\` must be a string`);
  const v = raw.trim();
  if (!v) throw httpError(400, `\`${field}\` must be a non-empty string`);
  return v;
}

export function createBooksRouter({ store }) {
  const router = express.Router();

  router.get('/', async (_req, res, next) => {
    try {
      res.json(await store.list());
    } catch (e) {
      next(e);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const book = await store.get(req.params.id);
      if (!book) throw httpError(404, 'Book not found');
      res.json(book);
    } catch (e) {
      next(e);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const title = parseNonEmptyString('title', req.body?.title, { optional: false });
      const author = parseNonEmptyString('author', req.body?.author, { optional: false });
      const year = parseYear(req.body?.year);

      const created = await store.create({ title, author, year });
      res.status(201).json(created);
    } catch (e) {
      next(e);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const title = parseNonEmptyString('title', req.body?.title, { optional: true });
      const author = parseNonEmptyString('author', req.body?.author, { optional: true });
      const year = parseYear(req.body?.year);

      if (title === undefined && author === undefined && year === undefined) {
        throw httpError(400, 'At least one of `title`, `author`, `year` must be provided');
      }

      const updated = await store.update(req.params.id, { title, author, year });
      if (!updated) throw httpError(404, 'Book not found');
      res.json(updated);
    } catch (e) {
      next(e);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const deleted = await store.delete(req.params.id);
      if (!deleted) throw httpError(404, 'Book not found');
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  });

  return router;
}

