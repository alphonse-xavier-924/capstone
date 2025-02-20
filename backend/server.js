require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/database");
const routes = require("./routes");

// create express app
const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.use(bodyParser.json({ limit: "10mb"}));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true}));

// add & configure middleware
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    }),
    sessionName: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    cookie: { secure: true, maxAge: 1209600000 },
    resave: true,
    saveUninitialized: true,
    retryWrites: false
  })
);

connectDB();

//define a simple route
app.get("/api", (req, res) => {
  res.json({ message: "No Page found" });
});

app.use("/api", routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// mongod --config /opt/homebrew/etc/mongod.conf --fork
