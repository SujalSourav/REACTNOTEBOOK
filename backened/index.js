
const connecttomongoose=require('./database')
connecttomongoose()
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000
const auth=require('./routes/auth.js')
const notes=require('./routes/notes.js')
app.use(express.json())
app.use(cors())
app.post('/', (req, res) => { 
  console.log(req.body) 
  res.send([])  

})
app.use('/auth',auth)
app.use('/notes',notes)
app.get("/",(req,res)=>{
  res.send("Backened is working")
})
app.listen(port, () => {
  console.log(`Inotebook app listening on port ${port}`)
})
