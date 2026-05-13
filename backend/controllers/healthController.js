exports.getHealth = (req, res) => {
  res.json({
    status: 'ok',
    service: 'onestopshop-c2c-api-node',
    timestamp: new Date().toISOString(),
  });
};
