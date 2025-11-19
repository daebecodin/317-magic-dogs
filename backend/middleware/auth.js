import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(403).json({ message: 'Missing token' });
  
  const token = header.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}
