import express from 'express';

function parseDelayMilliseconds(raw) {
  const parsed = Number(raw ?? '1000');
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 1000;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createSystemRouter() {
  const router = express.Router();

  router.get('/health', (_req, res) => res.json({ ok: true }));

  router.get('/delay', async (req, res, next) => {
    try {
      const ms = parseDelayMilliseconds(req.query.ms);
      await sleep(ms);
      res.status(200).send(`delay for ${ms} milliseconds`);
    } catch (e) {
      next(e);
    }
  });

  return router;
}
