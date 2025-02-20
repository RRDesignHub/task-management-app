const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 9000
const app = express()


// middleware:
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/', async (req, res) => {
  res.send('Task is managing...')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u6vhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const userCollection = client.db('tourHubDB').collection('users');

    // jwt token create:
    app.post('/jwt', async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.SECRET_KEY, { expiresIn: "1h" })
      res.send({ token });
    })

    // verify user token middleware:
    const verifyToken = async (req, res, next) => {
      if (!req.headers.auth) {
        return res.status(401).send({ message: "Unauthorised Access!!!" });
      }
      const token = req.headers.auth.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) { return res.status(401).send({ message: "Unauthorised Access!!!" }) };
        req.decoded = decoded;
      })
      next();
    }


    app.post('/users/:email', async (req, res) => {
      const email = req.params.email;
      const userData = req.body;
      const query = { email };
      const alreadyExist = await userCollection.findOne(query);
      if (alreadyExist) {
        return res.send({ message: "User already exist in database!!!", alreadyExist });
      }

      const result = await userCollection.insertOne({
        ...userData, role: "user", time: Date.now()
      });
      res.send(result);
    })



    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})