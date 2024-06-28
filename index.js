const express = require('express');
const app = express();
const cors=require('cors')
const { MongoClient } = require('mongodb');

let user = []
let product=[{'pname':'phone','model':'123','price':'2000'},{'pname':'laptop','model':'234','price':'3000'},{'pname':'pc','model':'567','price':'10000'}]
let info='This is the third day of internship'
app.use(cors());
app.use(express.json());

async function mongoConnect() {
    let client = new MongoClient('mongodb+srv://anshif:nesRoWgW5SqAD0yF@cluster0.8dtglzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();
    db = client.db('jyothi');
   ;
 }
 
app.get('/users', async function (req, res) {
    let output = await db.collection('user').find({}).toArray();
    res.json(output);
});

  
app.get('/users',function(req,res) {
    res.json(user)
})
app.post('/SignUp', function(req,res) {
    console.log(req.body)
    user.push(req.body)
})
app.post('/Login',function(req,res){
    console.log(req.body);
    for(let i=0;i<user.length;i++){
        if(user[i].email==req.body.email){
            if(user[i].pass1==req.body.pass1){
                return res.json(user[i]);
            }
        }
        return res.json("email not found")
    }
    

})

app.get('/product',function(req,res){
    res.json(product)
})
app.get('/userinfo',function(req,res) {
    res.json(info)
})

app.listen(5000, function() {
    console.log('server is ready, listening on port 5000')
})