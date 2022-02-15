const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config({path:'./config.env'});
const mongoose = require('mongoose')
const imageRouter = require('./routers/imageRouter')

// MIDDLEWARE
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cors());
app.use(express.json())
// ROUTERS
app.use('/api/v1/image',imageRouter)



// CONNECT DATABASE AND OPEN THE SERVER
const port = process.env.PORT ||3001;
const DB = process.env.DB.replace('<PASSWORD>',process.env.DB_PASS)
mongoose.connect(DB,()=>{
    console.log('DB connect')
})
app.listen(port,()=>{
    console.log(`server is listening ${port}`)
})