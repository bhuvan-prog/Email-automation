const { MongoClient } =
  require("mongodb");

require("dotenv").config();

const uri ="mongodb+srv://bhuvan:bhuvan123@m0.xdyubfb.mongodb.net/linkedinAutomation?retryWrites=true&w=majority&appName=M0";
 

async function connectDB() {
  try {
    const client =
      new MongoClient(uri);

    await client.connect();

    console.log(
      "MongoDB Connected Successfully ✅"
    );

    return client.db(
      "linkedinAutomation"
    );
  } catch (error) {
    console.error(
      "Database Connection Failed ❌",
      error
    );
  }
}

module.exports = connectDB;