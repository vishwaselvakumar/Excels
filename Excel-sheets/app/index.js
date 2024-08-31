const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const mongoose = require("mongoose");
const etableRoute = require('./routes/etableRoute')



mongoose.connect("mongodb+srv://vishwa:GGk7cLDPQPWmWyMW@cluster0.yeztlnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true, // To use the new URL parser
    useUnifiedTopology: true, // To use the new Server Discover and Monitoring engine
})
.then(() => {
    console.log("Connected to the database!");
})
.catch((err) => {
    console.error("Cannot connect to the database!", err);
    process.exit(1); // Exit with failure
});
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Max-Age', '7200');
    if (req.method === "OPTIONS") {
        res.status(200).end();
    } else {
        next();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use('/api/ultrafly',etableRoute);