const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const routes = require('./routes');
const { serveSwaggerUI, setupSwaggerUI } = require('./swagger');

// Create Express app
const app = express();

app.use(cors())
// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Serve Swagger UI
app.use('/api-docs', serveSwaggerUI, setupSwaggerUI);

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
