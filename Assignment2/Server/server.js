var http = require('http');
var port = process.env.PORT || 3000;

const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const path = require('path');
const db = require('./db');

const collection = 'moviecollection';
app.use('/', express.static(__dirname + '/'));

app.use(express.static(path.join(__dirname,'../Drone/www/')));
let receivedata = '1';

/* connecting to the database*/
db.connect((err) => {
  if (err) {
    console.log('unable to connect to database');
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log('connected to database, listening on port 3000');
    
    });
  }
});

/*deleting the data of certian id*/
app.delete('/:id', (req, res) => {
    const moviesID = req.params.id;
    db.getDb().collection(collection).findOneAndDelete({ _id: db.getPrimaryKey(moviesID) }, (err, result) => {
        if (err) {
            const error = new Error("Unable to delete moview review");
            error.status = 400;
            next(error);
        }
        else {
            res.json({ result, msg: "Successfully deleted movie review!!!", error: null });
        }
    });
});

/* editing the data of certain id */
app.put('/:id', (req, res) => {
    // Primary Key of movies Document we wish to update
    const moviesID = req.params.id;
    // Document used to update
    const userInput = req.body;
    // Find Document By ID and Update
    console.log(userInput.actor);
    
    
    if (userInput.movies == "") {
        console.log("Empty");
        const error = new Error("Invalid Input");
        error.status = 400;
        res.json({ msg: "Please enter valid name", error: true });
    }
    else {
        
        db.getDb().collection(collection).findOneAndUpdate({ _id: db.getPrimaryKey(moviesID) }, 
          { $set: { moviename: userInput.movie,actor:userInput.actor,actress:userInput.actress,price:userInput.price,
            time:userInput.birthdaytime,DropDownList:userInput.DropDownList
         } }, { returnOriginal: false }, (err, result) => {
            if (err)
                res.json({ msg: "Failed to update movies document", error: true })
            else {
                res.json({result, msg: "Succesfully updated your movie database", error: null });
            }
        });
    }
});

/*homepage */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Drone/www/index.html'));
});

app.post('/test', (req, res) => {
  console.log(req.body.data);
  res.status(200);
  res.json({ msg: 'Log got succesfully' });
});

/*getting every data on database*/
app.get('/get', (req, res) => {

  db.getDb()
    .collection(collection)
    .find({})
    .toArray((err, documents) => {
      if (err) {
        console.log(err);
      } else {
        res.json(documents);
      }
    });
});

/*searching movie by moviename*/
app.post('/searchMovies', (req, res) => {
  console.log(req.body);
  console.log(req.body.movies);
  a=req.body.movies;
  
  db.getDb()
    .collection(collection)
    .find({moviename:a})
    .toArray((err, documents) => {
      if (err) {
        console.log(err);
      } else {
        res.json(documents);
      }
    });
});

/*gettinf data by idname*/
app.get('/:id', (req, res) => {
 const moviesID = req.params.id;

  db.getDb()
    .collection(collection)
    .find({ _id: db.getPrimaryKey(moviesID) })
    .toArray((err, documents) => {
      if (err) {
        console.log(err);
      } else {
        res.json(documents);
      }
    });
});
/*posting data to the database*/
app.post('/post', (req, res) => {
	console.log(req.body.data);
  db.getDb().collection(collection).insertOne(req.body.data, (err, result) => {
      if (err) {
        const error = new Error('Failed to insert log');
        error.status = 400;
      } else {
        res.json({
          result: result,
          document: result.ops[0],
          msg: 'Log updated successfully!',
          error: null,
        });
      }
    });
});
