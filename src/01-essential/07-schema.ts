import { Elysia, t } from 'elysia';
const app = new Elysia();

// Local Schema
// The local schema is executed on a specific route.
app.get('/blogs', () => 'This is Elysia Blog');
app.get('/blogs/:slug', ({ params: { slug } }) => `Blog title ${slug}`, {
  params: t.Object({
    slug: t.String(),
  }),
});

// Global Schema (still bug)
// Register hook into every handler that came after.
// app.get('/none', () => 'None');
// app.schema({
//   query: t.Object({
//     name: t.String(),
//   }),
// });
// app.get('/query', ({ query: { name } }) => `Hello ${name}`);

export default app;
