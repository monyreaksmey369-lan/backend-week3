// validateQuery.js - Q2: Route-specific query validation middleware
const validateQuery = (req, res, next) => {
    const { minCredits, maxCredits } = req.query;

    if (minCredits !== undefined) {
        const min = parseInt(minCredits);
        if (isNaN(min)) {
            return res.status(400).json({
                error: `Invalid query parameter: minCredits must be an integer. Received: "${minCredits}"`
            });
        }
    }

    if (maxCredits !== undefined) {
        const max = parseInt(maxCredits);
        if (isNaN(max)) {
            return res.status(400).json({
                error: `Invalid query parameter: maxCredits must be an integer. Received: "${maxCredits}"`
            });
        }
    }

    if (minCredits !== undefined && maxCredits !== undefined) {
        const min = parseInt(minCredits);
        const max = parseInt(maxCredits);
        if (min > max) {
            return res.status(400).json({
                error: `Invalid credit range: minCredits (${min}) cannot be greater than maxCredits (${max}).`
            });
        }
    }

    next();
};

export default validateQuery;