import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    service: 'ethossphere-api',
    ok: true,
    endpoints: {
      health: '/health',
    },
  });
});

// Avoid noisy browser requests in logs.
app.get('/favicon.ico', (_req, res) => {
  res.status(204).end();
});

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'api', ts: new Date().toISOString() });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});

