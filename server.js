const express = require("express");
const http = require("http");
const path = require("path");
const logger = require("morgan"); 
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const noteRoutes = require("./server/routes/note");

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Logging
app.use(logger('dev'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// CORS headers (you technically already used `cors()` above but this is okay for extra control)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Debug logger (optional but helpful)
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// API routes — should come **before** Angular static files
app.use("/api/notes", noteRoutes);

// Serve static files (Angular)
app.use(express.static(path.join(__dirname, 'dist/notes-app/browser')));

// All other routes go to Angular
// app.get('*', (req, res) => {
//   console.log(`Wildcard route triggered for: ${req.url}`);
//   res.sendFile(path.join(__dirname, 'dist/notes-app/browser/index.html'));
// });


// Start server
const server = http.createServer(app);
server.listen(3000, () => console.log("Server running on port 3000"));
