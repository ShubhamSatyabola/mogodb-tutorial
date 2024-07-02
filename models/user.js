const getDb = require("../util/database").getDb;
const { ObjectId } = require("mongodb");

class User{
    constructor(username, email, phone){
        this.username = username;
        this.email = email;
      this.phone = phone;
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this).then(res=>console.log(res)).catch(err=>console.log(error));

    }

    static findById(id){
        const db = getDb();
        return db
          .collection("users")
          .find({ _id: new ObjectId(id) })
          .next()
          .then((res) => console.log(res))
          .catch((err) => console.log(error));
    }
}

module.exports = User;