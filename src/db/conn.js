const mongoose = require('mongoose');

const username = 'root';
const password = 'root';
const cluster = 'cluster0.6locl';
const dbName = 'sowProjectDb'; 

//Create Connection and new Db
mongoose.connect(
   `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}`,
      {
         useNewUrlParser: true,
         useUnifiedTopology: true
      }).then(() => {
           console.log('Mongoose Connection successful')
      }).catch((err) => {
           console.log(`no connectoin error -> ${err}`)
   });