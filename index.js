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
    const arrivalproductsCollection = client.db("pc-builder-Database").collection("arrivalproducts")
    const dealsproductsCollection = client.db("pc-builder-Database").collection("Dealsproducts")
    const allproductsCollection = client.db("pc-builder-Database").collection("allproducts")






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




    app.get("/aggre", async  (req, res ) => {
      const ress = await featureCategoris.find({}).toArray()
      res.send(ress)
    })


    // Feature product datails page 
    app.get("/ag/:id", async  (req, res ) => {
      const id = req.params.id
      const data = await featureCategoris.find({}).toArray()
      var store;

      data?.forEach((product) => {
        // console.log( "what is: ", product)
        const { name, prodcuts } = product;  
        // console.log(prodcuts)   // this is array
        console.log( id )
        const result = prodcuts.filter(( item ) => item.id === id)
        console.log(result)
        if(result.length == 1){
          store = result
        }
  

      })


      res.send(store)
    })





    // get static paths 
    app.get("/paths", async  (req, res ) => {
      const id = req.params.id
      const data = await featureCategoris.find({}).toArray()
      var store = []

      data?.forEach((product) => {
        // console.log( "what is: ", product)
        const { name, prodcuts } = product;  
        // console.log(prodcuts)   // this is array
       store.push(prodcuts)
       
      })

      res.send(store)
    })







 





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

    // checking 
    app.get("/speaker", async (req, res) => {
      const query = { }
      const result = await speakerproductsCollection.find(query).toArray()
      res.send(result)
    })

    app.get("/speakerproducts", async (req, res) => {
      // const query = req.params.id
      // db.test.find({shapes: {"$elemMatch": {color: "red"}}}

      const result = await speakerproductsCollection
       
      res.send(result)
    })





    




    // arrival products Collection 
    app.get("/arrivalproducts", async (req, res ) => {
        const query = {}
        const products = await arrivalproductsCollection.find(query).toArray()
        res.send(products)
    })

    app.get("/arrivalproducts/:id", async (req, res) => {
       const id = req.params.id
       const query = { _id: new ObjectId(id)}
       const product = await arrivalproductsCollection.findOne(query)
       res.send(product)
    })




    // Deals products functionality set 
    app.get("/dealsproducts", async (req, res) => {
        const query = { }
        const products = await dealsproductsCollection.find(query).toArray()
        res.send(products)
    })
    
    app.get("/dealsproducts/:id", async (req, res) => {
        const id = req.params.id
        const query = { _id : new ObjectId(id)}
        const  product= await dealsproductsCollection.findOne(query)
        res.send(product)
    })









    // all products functionality features in navber product route
    app.get("/allproducts", async (req, res) => {
        const query = { }
        const  allproducts = await allproductsCollection.find(query).toArray()
        res.send(allproducts)
    })

    app.get("/pro", async (req, res) => {
        const filter = {}
        const product = await featureCategoris.find(filter).toArray()
        res.send(product)
    })

    app.get("/prod", async (req, res) => {
      // const filter = { name : {$eq :"Motherboard"} }
      const product = await featureCategoris.find({ "prodcuts.id": {$ne: "1"} }).toArray()


      console.log(product)
      res.send(product)
  })

    


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    //Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);










app.get('/', (req, res) => {
  res.send('pc builder server is runing..')
})

app.listen(port, () => {
  console.log(`PC Builder project on port ${port}`)
})