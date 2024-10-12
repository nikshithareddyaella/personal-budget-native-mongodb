const mongoose = require('mongoose')
const budgetModel = require('./models/budget_schema')


let url = 'mongodb://127.0.0.1:27017/graphs';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connected to database")
    // Fetch
    budgetModel.find({})
    .then((data)=>{

        
        console.log(data);
        mongoose.connection.close();
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })
})
.catch((connectionError)=>{
    console.log(connectionError);
})