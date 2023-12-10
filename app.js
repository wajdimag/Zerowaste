const http = require('http');
const express = require('express');
const mongo = require('mongoose');
const bodyParser = require('body-parser');
const mongoConnect = require('./config/dbconnection.json');
const utilisateurRouter = require('./routes/utilisateur');
const dotenv = require('dotenv');
const { Socket } = require('socket.io');
const path = require('path');
const app = express();  
const socketIO = require('socket.io');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/utilisateur", utilisateurRouter);


dotenv.config();
mongo.connect(mongoConnect.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('mongo connected')).catch((err) => console.log(err));

const server = http.createServer(app);
const io = socketIO(server);


io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle 'addUser' event from the client
    socket.on('addUser', (userData) => {
      // Process the new user data as needed
      console.log('User added:', userData);
  
      // Broadcast the 'addUser' event to all connected clients
      io.emit('addUser', userData);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });






server.listen(3000, () => console.log('server run'));
