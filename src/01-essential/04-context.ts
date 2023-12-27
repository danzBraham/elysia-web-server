import { Elysia } from 'elysia';
const app = new Elysia();

// State create a global mutatable state into Context.store
app.state('version', 1);
app.state('counter', 0);

// Decorate add additional function or property assigned to Context (read-only and not reassigned later)
app.decorate('logger', console);

// Derive assigns a property when each request happens
app.derive(({ headers }) => {
  const auth = headers['Authorization'];
  return { bearer: auth?.startsWith('Bearer ') ? auth.slice(7) : null };
});

interface ContextParams {
  store: {
    version: number;
    counter: number;
  };
  set: {
    headers: Record<string, string>; // Assuming headers are key-value pairs
    status: number | string;
  };
  logger: any;
  bearer: string | null;
}

app.get('/', ({ set, store, logger, bearer }: ContextParams) => {
  set.status = 'OK';
  set.headers['Content-Type'] = 'application/json';
  set.headers['X-Powered-By'] = 'Elysia';

  logger.log(`${store.counter}. Hello from log`);

  return {
    status: 'success',
    message: 'Hello World!',
    version: store.version,
    counter: `${store.counter++}x refreshed`,
    auth: bearer,
  };
});

app.get('/context', (context) => context);

export default app;
