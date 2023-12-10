const http = require('http');
const express = require('express');

const mongo = require('mongoose');
const mongoConnect = require('./config/dbconnection.json');

const bodyParser = require('body-parser');
const path = require('path');

const alerteRouter = require('./routes/alerte');
const preferenceRouter = require('./routes/preference');

const { Socket } = require('socket.io');

// Connect to MongoDB
mongo.connect(mongoConnect.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));

const app = express();

// Set templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Enable body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route for alerts
app.use('/alerte', alerteRouter);

// Route for preferences
app.use('/preference', preferenceRouter);

// Create server and initialize Socket.IO
const server = http.createServer(app);
const io = require('socket.io')(server);

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('User connected');

  // Welcome message
  socket.emit('msg', 'User is connected');

  // Handle alert creation
  socket.on('alerte_created', (alerte) => {
    io.emit('new_alerte', alerte);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    io.emit('msg', 'User disconnected');
  });
});

// Start server
server.listen(3000, () => console.log('Server running on port 3000'));

module.exports = app;
