export default async function handler(req, res) {
  try {
    const serverModule = await import('../dist/portfolio/server/server.mjs');

    const server = serverModule.default || serverModule.app || serverModule;

    if (typeof server === 'function') {
      return server(req, res);
    } else if (server && typeof server.handle === 'function') {
      return server.handle(req, res);
    } else {
      throw new Error('Server module does not export a valid handler');
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}
