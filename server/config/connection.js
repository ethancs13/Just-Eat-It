const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/justeatit')
    .then(() => {
        console.log(`The database is up and connected.`);
    })
    .catch((err) => {
        console.error(err);
    });

module.exports = mongoose.connection;
