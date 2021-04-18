const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGOATLASDB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Database UP');
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to db')
    }
}

module.exports = {
    dbConnection
}