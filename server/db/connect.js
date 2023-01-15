const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://amanuel:newwayoflife@eduharmonycluster.acejwqh.mongodb.net/?retryWrites=true&w=majority'

const connectDB = (uri) => {
    mongoose.set("strictQuery", false);
    return mongoose
    .connect(uri,{
        useNewUrlParser:true,   
        useUnifiedTopology: true
    })
    .then(()=> console.log('CONNECT TO DB'))
    .catch((err)=> console.log(err))
}


module.exports = connectDB