export default async (req, res) => {
  const { reqHandler } = await import('../dist/portfolio/server/server.mjs');
  return reqHandler(req, res);
};
