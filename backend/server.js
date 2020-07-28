const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://onurr23:F6pTG8UpAzg2c62R@cluster0-swoaz.mongodb.net/twitter-clone?retryWrites=true&w=majority').then(()=>{

    console.log('CONNECTED')

})

const userRoutes = require('./Routes/User');
const tweetRoutes = require('./Routes/Tweet');

app.use('/',userRoutes);
app.use('/tweet',tweetRoutes);

app.listen(5000,()=>{

    console.log('Server is Running !')

})