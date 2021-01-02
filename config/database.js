const mongoose = require("mongoose");
const env = process.env.NODE_ENV || 'development';

if(env === 'test') {
  process.env.MONGO_URI = 'mongodb://localhost/crypto_test'
} else { 
  process.env.MONGO_URI = 'mongodb://localhost/crypto'
}


mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log(`DB is connected ${env} database`))
  .catch((err) => console.error(err));

module.exports = mongoose;