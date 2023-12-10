const http = require("http");
const express = require("express");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const mongoconnect = require("./config/mongodbconfig.json");
const path = require("path");
const { add } = require("./controller/articlecontroller");
const { addcomment } = require("./controller/commentairecontroller");


const {
  addarticlesocket,
  affichesocket, 
} = require("./controller/articlecontroller");
const {
  addcommentairesocket,
} = require("./controller/commentairecontroller");

mongo
  .connect(mongoconnect.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongo connecter"))
  .catch((err) => console.log(err));

const articlerouter = require("./routes/article");
const commentairerouter = require("./routes/commentaire");

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/article", articlerouter);
app.use("/commentaire", commentairerouter);


const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection",  (socket) => {

  console.log("user connected");
  socket.emit("msg", "user is connected");

socket.on("article", (data) => {
  addarticlesocket(data);
  io.emit("article", data);
})
socket.on("commentaire", (data) => {
  addcommentairesocket(data);
  io.emit("commentaire", data);
})
socket.on("aff", async (data) => {
  const r = await affichesocket(data);
  console.log("jjjjjj", JSON.stringify(r));
  io.emit("aff", r);
});

socket.on("typing", (data) => {
  io.emit("typing", data + "is typing");
});

socket.on("msg", (data) => {
  add(data.object);
  io.emit("msg", data.name + ":" + data.object);
});

socket.on("disconnect", () => {
  console.log("user disconnect");
  io.emit("msg", "user disconnect");
})});
server.listen(3000, console.log("server run"));
module.exports = app;
