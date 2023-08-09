const mongoose = require('mongoose')

const connectionString = process.env.MONGO_URL


mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,

}).then(() => {
    console.log('mongodb atlas connected successfully');
}).catch((error) => {
    console.log(`mongodb connection error ${error}`);
})