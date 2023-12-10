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
    const topSellingProducts = client.db("pc-builder-Database").collection("topSellingProducts")
    const speakerproductsCollection = client.db("pc-builder-Database").collection("speakerproducts")







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


    // get one categori by id query 
    app.get("/categoris/:id", async (req, res) => {
        const id = req.params.id 
        const query = {_id: new ObjectId(id)}
        const result= await featureCategoris.findOne(query)
        res.send(result)
    })


    // /api/products?category=processor&productId=1234

    // db.collectionName.aggregate([
    //   { $unwind: "$products" }, 
    //   { $match: { "products.id": "Processor" } }
    // ])

    app.get("/datails/:id", async (req, res) =>{
        const id = req.params.id
        // const filter = {id: id}
        // console.log(filter)
        const query = { "products.id" : id }
        const result = await featureCategoris.findOne(query)
        res.send(result)
    })



















    // topSellingProducts
    app.get("/topSellingProducts", async (req, res ) => {
        const filter = {}
        const result =  await topSellingProducts.find(filter).toArray()
        res.send(result)
    })

    app.get("/topsellingDainamic/:id", async (req, res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id) }
        const data = await topSellingProducts.findOne(filter)
        res.send(data)
    })




    // speaker products Collection
    app.get("/spekerfourImg", async (req, res ) => {
        const query = {}
        const img = await speakerproductsCollection.find(query).project({images: 1}).toArray()
        res.send(img)
    })

    app.get("/speaker/:id", async (req, res) => {
       const id = req.params.id
       const query = { _id: new ObjectId(id) }
       const speakerOne = await speakerproductsCollection.findOne(query)
       res.send(speakerOne)
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