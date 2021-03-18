const { MongoClient } = require("mongodb");

const MongoClent = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbname = "Movies";
const uri = "mongodb+srv://Rebika:12110965@cluster0.ekhk4.mongodb.net/<DroneLogger>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  currentCollection = client.db("Movies").collection("moviecollection");
  console.log("Database is connected...... ");
});
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const state = {
    db: null
};
const connect = (cb) => {

    if (state.db) {
        cb();
    }
    else {
        MongoClient.connect(uri, mongoOptions, (err, client) => {
            if (err) {
                cb(err);
            }
            else {
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}
const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}
const getDb = () => {
    return state.db;
}
module.exports = { getDb, connect, getPrimaryKey };

