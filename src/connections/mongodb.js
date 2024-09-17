const URL = "mongodb://localhost:27017/local";
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect(URL, {
    'useUnifiedTopology': true,
})
    .then(() => {
        console.log("---mongodb connection successfully---");
    }).catch((error) => {
        console.log("---DB Connection ERROR--", error);
    });

function cleanup() {
    mongoose.connection.close(function () {
        console.log('Mongoose connection closed.');
        process.exit(0);
    });
}

process.on('SIGINT', cleanup)
process.on('exit', cleanup)
process.on('SIGTERM', cleanup);
