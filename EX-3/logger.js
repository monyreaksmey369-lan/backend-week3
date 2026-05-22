// logger.js - Q1: Global logging middleware
function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);

    if (Object.keys(req.query).length > 0) {
        console.log(`  Query params:`, req.query);
    }

    next();
}

export default logger;