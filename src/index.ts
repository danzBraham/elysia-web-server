import app from './01-essential/05-plugin';
// import { Elysia } from 'elysia';
// import plugin from './plugin';

// const app = new Elysia();

// app.use(plugin({ version: 'v1' }));

// app.state('version', 1);
// app.state('counter', 0);
// app.decorate('logger', console);

// app.get('/', ({ set, store, logger }) => {
//   set.status = 'OK';
//   set.headers['Content-Type'] = 'application/json';
//   set.headers['X-Powered-By'] = 'Elysia';

//   logger.log(`${store.counter}. Hello from log`);
//   return {
//     status: 'success',
//     message: 'Hello World!',
//     counter: `${store.counter++}x refreshed`,
//   };
// });
// app.route('M-SEARCH', '/', () => 'connect');
// app.all('/', () => 'Hello');

// app.get('/all', (context) => context);

// app.get('/about', () => 'About Elysia');
// app.get('/about/*', ({ params }) => `wildcard path: ${params['*']}`);

// app.get('/blogs', () => 'This Elysia Blog');
// app.post('/blogs', () => 'Posting a Blog');
// app.get('/blogs/:category', ({ params: { category } }) => `Blog category: ${category}`);
// app.get(
//   '/blogs/:category/:slug',
//   ({ params: { category, slug } }) => `Blog category: ${category}, blog: ${slug}`
// );

// app.get('/penguin', Bun.file(import.meta.resolveSync('./penguin-coding.gif')));

// app.onError(({ code }) => {
//   if (code === 'NOT_FOUND') return 'Route not found :(';
// });

app.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
