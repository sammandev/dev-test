const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback')
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev'
});

const app = express();
const PORT = process.env.PORT || 4321;
const ENV = process.env.NODE_ENV || 'development';

// Enhanced error handling
app.use((err, req, res, next) => {
    console.error(`[${ENV}] Error:`, err.stack);
    res.status(500).send('Server Error');
});

// Security headers for production
if (ENV === 'production') {
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
}

app.use(history());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`[${ENV}] Server running on port ${PORT}`);
}).on('error', (err) => {
    console.error(`[${ENV}] Server failed to start:`, err);
    process.exit(1);
});