import { Elysia, t } from 'elysia';
import { isHtml } from '@elysiajs/html';
const app = new Elysia();

const isUserExist = true;

// Guard
// Allows us to apply hook and schema into multiple routes all at once
app.guard(
  {
    body: t.Object({
      username: t.String(),
      password: t.String(),
    }),
  },
  (app) =>
    app
      .post('/sign-up', ({ body }) => body)
      .post('/sign-in', ({ body }) => body, {
        beforeHandle() {
          isUserExist;
        },
      })
);

app.get('/', () => 'Hello Elysia');
app.get('/sign-up', () => 'Please Sign Up');
app.get('/sign-in', () => 'Please Sign In');

// Groupped Guard
app.group('/api/v1', (app) =>
  app
    .get('/anime', () => 'Anime List')
    .get('/manga', () => 'Manga List')
    .guard(
      {
        body: t.Object({
          name: t.String(),
          eps: t.Numeric(),
        }),
      },
      (app) => app.post('/anime', ({ body }) => body)
    )
);

// Plugin
// By default, the Elysia plugin doesn't encapsulate the event
// const html = new Elysia({ name: 'html-plugin' });
// html.onAfterHandle(({ response, set }) => {
//   if (isHtml(response)) {
//     set.headers['Content-Type'] = 'text/html; charset=utf-8';
//   }
// });
// html.get('/inner', () => '<h1>Hello HTML Plugin</h1>');

// app.get('/none', () => '<h1>Before HTML Plugin</h1>');
// app.use(html);
// app.get('/outer', () => '<h1>After HTML Plugin</h1>');

// Scoped Plugin
// Sometimes we want to encapsulate the event and not "leak" the event out of the plugin
// We can accomplish that by adding scoped: true to the Elysia instance
const scopedHtml = new Elysia({ name: 'scoped-html-plugin', scoped: true });
scopedHtml.onAfterHandle(({ response, set }) => {
  if (isHtml(response)) {
    set.headers['Content-Type'] = 'text/html; charset=utf-8';
  }
});
scopedHtml.get('/inner', () => '<h1>Hello Scoped HTML Plugin</h1>');

app.get('/none', () => '<h1>Before Scoped HTML Plugin</h1>');
app.use(scopedHtml);
app.get('/outer', () => '<h1>After Scoped HTML Plugin</h1>');

export default app;
