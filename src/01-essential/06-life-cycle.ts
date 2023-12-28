import { Elysia } from 'elysia';
import { isHtml } from '@elysiajs/html';
const app = new Elysia();

// Local Hook
// The local hook is executed on a specific route
app.get('/', () => '<h1>Hello Elysia</h1>', {
  afterHandle({ response, set }: any) {
    if (isHtml(response)) {
      set.headers['Content-Type'] = 'text/html; charset=utf-8';
    }
  },
});
app.get('/plain', () => 'Hello World');

// Global Hook
// Register hook into every handler that came after.
app.onAfterHandle(({ response, set }: any) => {
  if (isHtml(response)) {
    set.headers['Content-Type'] = 'text/html; charset=utf-8';
  }
});
app.get('/global', () => '<h1>Hello Global</h1>');
app.get('/mars', () => '<h1>Hello Mars</h1>');

// Order of Code
// The order of Elysia's life-cycle code is very important
const order = new Elysia({ name: 'order' });

order.onBeforeHandle(() => {
  console.log('before');
});
order.onAfterHandle(() => {
  console.log('after');
});
order.get('/order', () => 'Order', {
  beforeHandle() {
    console.log(2);
  },
});

app.use(order);

export default app;
