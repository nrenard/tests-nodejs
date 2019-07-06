const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') return res.status(401).json({ message: 'Token mal formated' });

  try {
    const decoded = await jwt.verify(token, process.env.APP_SECRET);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};
