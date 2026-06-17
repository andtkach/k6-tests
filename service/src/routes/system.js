import express from 'express';

function parseDelaySeconds(raw) {
  const parsed = Number(raw ?? '1');
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 1;
}

function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function createSystemRouter() {
  const router = express.Router();

  router.get('/health', (_req, res) => res.json({ ok: true }));

  router.get('/delay', async (req, res, next) => {
    try {
      const seconds = parseDelaySeconds(req.query.delay);
      await sleep(seconds);
      res.status(200).send(`delay for ${seconds} seconds`);
    } catch (e) {
      next(e);
    }
  });

  return router;
}
