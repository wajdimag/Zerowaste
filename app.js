const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const mongoConnection = require('../test/config/dbconnection.json');
const { addactivite, show: showActivite } = require("./controller/activitecontroller");
const { addobjectif, show: showObjectif } = require("./controller/objectifcontroller");

mongoose.connect(mongoConnection.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Mongo connected'))
  .catch((err) => console.error('Mongo connection error:', err));

var adminrouter = require('../test/routes/admin');
var activiterouter = require('../test/routes/activite');
var objectifrouter = require('../test/routes/objectif');
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/admin", adminrouter);
app.use("/activite", activiterouter);
app.use("/objectif", objectifrouter);

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("msg", "user is connected");

  socket.on("disconnect", () => {
    console.log("user disconnect");
    io.emit("msg", "user is disconnect");
  });

  socket.on('activite', async (data) => {
    addactivite(data);
    io.emit('nouveauActivite', { nom_activite: data.nom_activite, compteur_initial: data.compteur_initial, compteur_final: data.compteur_final });
  });

  socket.on("tous", async () => {
    try {
      const data = await showActivite();
      console.log('Data to send:', data);
      if (data) {
        io.emit('tous', data);
      } else {
        console.error('Error fetching user data or data is undefined');
        socket.emit('aff_error', { error: 'Internal Server Error' });
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      socket.emit('aff_error', { error: 'Internal Server Error' });
    }
  });

  socket.on('objectif', async (data) => {
    addobjectif(data);
    io.emit('nouveauObjectif', { objectif: data.objectif, frequence: data.frequence });
  });

  socket.on("tousObjectif", async () => {
    try {
      const data = await showObjectif();
      console.log('Data to send:', data);
      if (data) {
        io.emit('tousObjectif', data);
      } else {
        console.error('Error fetching objectif data or data is undefined');
        socket.emit('aff_error', { error: 'Internal Server Error' });
      }
    } catch (err) {
      console.error('Error fetching objectif data:', err);
      socket.emit('aff_error', { error: 'Internal Server Error' });
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
