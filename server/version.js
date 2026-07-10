module.exports = (req, res) => {
  res.json({
    nodeVersion: process.version,
    env: process.env.NODE_ENV,
    vercel: process.env.VERCEL || 'not vercel'
  });
};
