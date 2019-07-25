const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callBack) => {
  MongoClient.connect('mongodb+srv://nodecomplete:Ooz0LDFVRV7FmUK2@cluster-test-te9za.mongodb.net/shop?retryWrites=true&w=majority";',{ useNewUrlParser: true })
  // we can change the database name in this part mongodb+srv://nodecomplete:Ooz0LDFVRV7FmUK2@cluster-test-te9za.mongodb.net/<Database name>?retryWrites=true&w=majority";
  // or we can pass the database name to _db = client.db(database name)
  .then(client => {
    console.log("connected");
    _db = client.db();
    callBack();
  })
  .catch(err => {
    console.log(err);
  });
};

const getDb = () => {
  if (_db){
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// we did this approach because if we didn't store the database into a variable and we use that variable in order 
// to do an operation to the database we will use mongoConnect(callback) which will open new client every time we call this method 
// instead we can open the connection one time and store it to a variable and we use that variable to use one client only 
