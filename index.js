const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000

// middleware
app.use(cors())
app.use(express.json())

require('dotenv').config()






const uri = `mongodb+srv://${process.env.USERNAMES}:${process.env.USERPASS}@cluster0.hcgdznz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    
    // await client.connect();
    // await client.db("pc-builder-Database").command({ ping: 1 });
    const sixrandomProducts = client.db("pc-builder-Database").collection("sixrandomProducts")
    const featureCategoris  = client.db("pc-builder-Database").collection("featuredCategorisProducts")

    app.get("/products", async (req, res) => {
        const filter= {}
        const result = await sixrandomProducts.find(filter).toArray()
        res.send(result)
    })



    app.get("/product/:id", async (req, res) => {
      const id = req.params.id
      console.log(id)
      const query = {_id: new ObjectId(id)}
      const prodcutOne = await sixrandomProducts.findOne(query)
      res.send(prodcutOne)
    })





    // Fuatured Categoris prodcuts 
    app.get("/categoris", async (req, res) => {
       const filter = { }
       const categoris = await featureCategoris.find(filter).toArray()
       res.send(categoris)
    })



    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);










app.get('/', (req, res) => {
  res.send('pc builder server is runing..')
})

app.listen(port, () => {
  console.log(`PC Builder project on port ${port}`)
})