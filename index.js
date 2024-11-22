const express = require('express')
const app = express()
const port = process.env.PORT||5000
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello world")
})

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://messiabbinavu:abbinavu@cluster0.zzap9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const website = client.db("ecommerce").collection("shoping");

    app.post("/upload",async(req,res)=>{
        const data = req.body;
        const result = await website.insertOne(data);
        res.send(result);
    })

    app.get("/store",async(req,res)=>{
        const store = website.find();
        const result = await store.toArray();
        res.send(result);
    })

    app.get("/stored/:id",async(req,res)=>{
        const id = req.params.id;
        const filter = {_id:new ObjectId(id)};
        const result = await website.findOne(filter);
        res.send(result);
    })

    app.patch("/all/:id",async(req,res)=>{
        const id = req.params.id;
        const updateStore = req.body;
        const filter = {_id:new ObjectId(id)};
        const updateDoc = {
            $set:{
                ...updateStore
            },
        }
        const options = {upsert:true};
        const result = await website.updateOne(filter,updateDoc,options);
        res.send(result);
    })

    app.delete('/stores/:id',async(req,res)=>{
        const id = req.params.id;
        const filter = {_id:new ObjectId(id)};
        const result = await website.deleteOne(filter);
        res.status(200).json({success:true,message:"data deleted successfully",result});
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})
