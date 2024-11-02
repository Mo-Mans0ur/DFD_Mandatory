// middleware/authorizeRole.js
const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ error: 'No user information found in request.' });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ error: 'Access denied. Insufficient privileges.' });
        }

        next();
    };
};

export default authorizeRole;
