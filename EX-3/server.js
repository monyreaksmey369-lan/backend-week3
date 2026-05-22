// server.js - Exercise 3: Enhance API with Middleware
import express from 'express';
import courses from "../EX-2/course.js";
import logger from './logger.js';
import validateQuery from './validateQuery.js';
import auth from './auth.js';

const app = express();
const PORT = 3000;

// Q1 - Global logger middleware
app.use(logger);

// Q3 (Bonus) - Global auth middleware
app.use(auth);

// Q2 - validateQuery applied only to this route
app.get('/departments/:dept/courses', validateQuery, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    const results = courses.filter(course => {
        if (course.department.toLowerCase() !== dept.toLowerCase()) return false;
        if (level && course.level.toLowerCase() !== level.toLowerCase()) return false;
        if (minCredits !== undefined && course.credits < parseInt(minCredits)) return false;
        if (maxCredits !== undefined && course.credits > parseInt(maxCredits)) return false;
        if (semester && course.semester.toLowerCase() !== semester.toLowerCase()) return false;
        if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) return false;
        return true;
    });

    if (results.length === 0) {
        return res.status(200).json({
            results: [],
            meta: { total: 0 },
            message: 'No courses found matching the given criteria.'
        });
    }

    res.json({
        results,
        meta: { total: results.length }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});