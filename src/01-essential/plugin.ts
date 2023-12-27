import { Elysia } from 'elysia';
const app = new Elysia();
app.get('/external', () => 'External plugin');

export default app;
