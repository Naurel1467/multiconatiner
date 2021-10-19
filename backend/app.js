require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const User = require('./models/user');

const cors = require('cors');
let corsOptions={
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))


var CryptoJS = require("crypto-js");

//DB
const mongoose = require('mongoose');
const mongoDB = 'mongodb://mongodb:27017/PortfolioDoctor';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//decryption
app.use((req, res, next) => {
    try {   
        if(req.body && req.body.data) {
            console.log("Encrypted data: ", req.body.data);
            req.body = decrypt(req.body.data)
        }
        next()
    }
    catch (exception) {
        console.log(exception)
        res.writeHead(500);
        res.send();
    }
})


app.post('/data', (req, res)=>{
    let userDetails = {

        age: req.body.age,
        gender: req.body.gender,
        city: req.body.city,
        profession: req.body.profession,
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,

        products: req.body.products,
        interaction: req.body.interaction,

        personalizedOptions: req.body.personalizedOptions,
    }
    //console.log(userDetails);
    let user = new User(userDetails);
    user.save((err)=>{
        if(err) console.log(err);
        console.log('New record added', user);
        res.json({
            type : "success" 
        })
    })
})



function encrypt(data) {
    try {
        // if(typeof(data) !== 'string') {
            data = JSON.stringify(data);
        // }
        return CryptoJS.AES.encrypt(data, process.env.TOKEN_SECRET).toString();
    } catch (e) {
      console.log("Encrypt Error",e);
    }
}

function decrypt(data){
    try {
        // data = data.replace(' ','+')
        let replacedData = '';

        for (var i = 0; i < data.length; i++) {
            if(data.charAt(i) == ' ') {
                replacedData += '+'
            }
            else {
                replacedData += data.charAt(i)
            }
        }
        // console.log("Decrypt", replacedData)
        const bytes = CryptoJS.AES.decrypt(replacedData, process.env.TOKEN_SECRET);
        if (bytes.toString()) {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        return replacedData;
    } catch (e) {
        console.log("Decrypt",e);
    }
}

app.listen(3000, ()=>{
    console.log("Serving on port 3000");
});
//to create a random str : require('crypto').randomBytes(64).toString('hex')
