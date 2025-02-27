
//Budget API 

const express = require('express')
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests

const mongoose = require('mongoose')
const budgetModel = require('./models/budget_schema')


let url = 'mongodb://127.0.0.1:27017/graphs';

app.get("/hello", (req, res) => {
    res.send("Hello World.");
})

app.get("/budget", (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to database")
            // Fetch
            budgetModel.find({})
                .then((data) => {
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
})

app.post("/addNewBudget", (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            // Insert
            let newData = new budgetModel(req.body);
            budgetModel.insertMany(newData)
            .then((data)=>{

                res.send("Data Entered Successfully")
                mongoose.connection.close();
            })
            .catch((connectionError)=>{
                res.send(connectionError.message)
            })
        })
        .catch((connectionError) => {
            res.send(connectionError);
        })
})


app.listen(port, () => {
    console.log("Api Served at http://localhost:" + port);
})
