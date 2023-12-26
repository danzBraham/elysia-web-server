import { Elysia } from 'elysia';

const app = new Elysia();

app.get('/', () => 'Home Page Elysia');
app.route('M-SEARCH', '/', () => 'connect');
app.all('/', () => 'Hello');

app.get('/about', () => 'About Elysia');
app.get('/about/*', ({ params }) => `wildcard path: ${params['*']}`);

app.get('/blogs', () => 'This Elysia Blog');
app.post('/blogs', () => 'Posting a Blog');
app.get('/blogs/:category', ({ params: { category } }) => `Blog category: ${category}`);
app.get(
  '/blogs/:category/:slug',
  ({ params: { category, slug } }) => `Blog category: ${category}, blog: ${slug}`
);

app.onError(({ code }) => {
  if (code === 'NOT_FOUND') return 'Route not found :(';
});

app.listen(3000);

app.handle(new Request('http://localhost:3000/')).then(console.log);
app.handle(new Request('http://localhost:3000/about')).then(console.log);
app.handle(new Request('http://localhost:3000/blogs')).then(console.log);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
