import { Elysia } from 'elysia';
// Plugin External
import extPlugin from './plugin';

// Plugin Basic
const plugin = new Elysia();
plugin.decorate('plugin', 'Hello from plugin');
plugin.get('/plugin', ({ plugin }: any) => plugin);

// Plugin with Config
const pluginWithConfig = (version = 0) => new Elysia().get('/version', `Plugin version ${version}`);

// Pluging for Deduplication (Good)
const pluginDedup = (config: any) =>
  new Elysia({
    name: 'my-plugin',
    seed: config, // optional
  }).get(`/${config.prefix}/dedup`, () => 'Hello from plugin deduplication');

// Plugin Service Locator
const setup = new Elysia({ name: 'setup' }).decorate('a', 'Plugin Service Locator');
const child = new Elysia().use(setup).get('/service', ({ a }) => a);
const main = new Elysia().use(child);

const app = new Elysia();
app.get('/', () => 'Hello');
app.use(plugin);
app.use(extPlugin);
app.use(pluginWithConfig(1));
app.use(pluginDedup({ prefix: 'v1' }));
app.use(main);

export default app;
