// server.js
import express from 'express';
import courses from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    
    if (minCredits !== undefined && maxCredits !== undefined) {
        const min = parseInt(minCredits);
        const max = parseInt(maxCredits);
        if (isNaN(min) && !isNaN(max) && min > max) {
            return res.status(400).json({ 
                message: 'Invalid credit range: minCredits cannot be greater than maxCredits' });
        }
    }

    const results = courses.filter(course => {
        if (course.department.toLowerCase() !== dept.toLowerCase()) return false;
        if (level && course.level.toLowerCase() !== level.toLowerCase()) return false;
        if (minCredits !== undefined ) {
                if (course.credits < parseInt(minCredits)) return false;
        }   
        if (maxCredits !== undefined) {
                if (course.credits > parseInt(maxCredits)) return false;
        }
        if (semester && course.semester.toLowerCase() !== semester.toLowerCase()) return false;
        if (instructor && course.instructor.toLowerCase() !== instructor.toLowerCase()) return false;
        return true;
    });

    if (results.length === 0) {
        return res.status(404).json({
            results: [],
            meta: { total: 0 },
            message: 'No courses found matching the criteria' });
    }

    res.json({results,
        meta: { total: results.length }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
