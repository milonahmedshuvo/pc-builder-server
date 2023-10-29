const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000

// middleware
app.use(cors())
app.use(express.json())





app.get('/', (req, res) => {
  res.send('pc builder server is runing..')
})

app.listen(port, () => {
  console.log(`PC Builder project on port ${port}`)
})