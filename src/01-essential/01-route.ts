import { Elysia } from 'elysia';

const app = new Elysia();

// Basic HTTP Method
app.get('/', () => 'Get Elysia Home page');
app.post('/', () => 'Post Elysia Home page');
app.put('/', () => 'Put Elysia Home page');
app.delete('/', () => 'Delete Elysia Home page');

app.get('/about', () => 'About Elysia');
app.get('/blogs', () => 'Welcome to Elysia Blog');

// Custom HTTP Method
app.route('M-SEARCH', '/', () => 'You come here using custom http method "M-SEARCH"');

// Elysia.all for handling any HTTP method for a specified path using the same API like above
app.all('/', () => 'Handling any HTTP method');

// Trigger a request to Elysia server programmatically using Elysia.handle
// like Postman, Insomnia or Hoppscotch to test API
app
  .handle(new Request('http://localhost:3000/', { method: 'GET' }))
  .then((data) => data.text().then(console.log));

app
  .handle(new Request('http://localhost:3000/', { method: 'POST' }))
  .then((data) => data.text().then(console.log));

app
  .handle(new Request('http://localhost:3000/', { method: 'PUT' }))
  .then((data) => data.text().then(console.log));

app
  .handle(new Request('http://localhost:3000/', { method: 'DELETE' }))
  .then((data) => data.text().then(console.log));

app
  .handle(new Request('http://localhost:3000/', { method: 'PATCH' }))
  .then((data) => data.text().then(console.log));

app
  .handle(new Request('http://localhost:3000/', { method: 'M-SEARCH' }))
  .then((data) => data.text().then(console.log));

app
  .handle(new Request('http://localhost:3000/about'))
  .then((data) => data.text().then(console.log));

app
  .handle(new Request('http://localhost:3000/blogs'))
  .then((data) => data.text().then(console.log));

app.onError(({ code }) => {
  if (code === 'NOT_FOUND') return 'Route not found :(';
});

export default app;
