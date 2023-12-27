import { Elysia } from 'elysia';
const app = new Elysia();

// Set is a special mutable property act as a representation of the response
app.get('/', ({ set }) => {
  set.status = 'OK';
  set.headers['Content-Type'] = 'application/json';
  set.headers['X-Powered-By'] = 'Elysia';

  return {
    status: 'success',
    message: 'Hello World!',
  };
});

// Handling Static Content
app.get('/penguin', Bun.file(import.meta.resolveSync('../assets/penguin-coding.gif')));

export default app;
