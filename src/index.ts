import { Elysia } from 'elysia';

const app = new Elysia();

app.get('/', () => 'Hello Elysia');
app.get('/about', () => 'About Elysia');
app.get('/blogs', () => 'This Elysia Blog');

app.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
