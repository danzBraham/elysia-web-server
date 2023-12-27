import { Elysia } from 'elysia';

const app = new Elysia();

// Static Path
app.get('/blogs', () => 'This Elysia Blog (Static Path)');

// Dynamic Path
app.get(
  '/blogs/:category',
  ({ params: { category } }) => `Blog category: ${category} (Dynamic Path)`
);

// Multiple Dynamic Path
app.get(
  '/blogs/:category/:slug',
  ({ params: { category, slug } }) =>
    `Blog category: ${category}, title: ${slug} (Mulitple Dynamic Path)`
);

// Wildcard Path
app.get('/about/*', ({ params }) => `${params['*']} (Wildcard Path)`);

export default app;
