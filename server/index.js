const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose')
const database = require('./db/database');


mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Database connected ')
  },
    error => {
      console.log('Database not connected : ' + error)
    }
  )


app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/api/stakeholder'))

app.use(express.static('public'));



const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});

console.log('Der Path',path.join(__dirname,'..','public','index.html'))