// auth.js - Q3 (Bonus): Token-based authentication middleware
const VALID_TOKEN = 'xyz123';

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({
            error: 'Unauthorized: Missing Authorization header.'
        });
    }

    // Expected format: "Bearer xyz123"
    const token = authHeader.split(' ')[1];

    if (!token || token !== VALID_TOKEN) {
        return res.status(401).json({
            error: 'Unauthorized: Invalid token.'
        });
    }

    next();
};

export default auth;