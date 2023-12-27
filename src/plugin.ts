import { Elysia } from 'elysia';

interface Config {
  version: string;
}

const plugin = (config: Config) => {
  return new Elysia({
    name: 'my-plugin',
    seed: config,
  })
    .decorate('plugin', 'This is Elysia plugin')
    .get(`${config.version}/plugin`, (context) => context);
};

export default plugin;
