


const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://demo:demorps@ds113785.mlab.com:13785/rps-scores', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

//attempt to replace get request below with an ajax request so the whole page does not refresh and restart the player
// ajax.get('/',(req,res)=>{
//     var messages=db.collection('messages').find();
//     messages.toArray((err,res)=>{
//         if(err) return console.log(err)
//         result.forEach(function(element){
//             element.total = element.thumbUp - element.thumbDown;
//         })
//         res.render('index.ejs', {messages: result})
//     })
// })

//express get request that requests object from database
app.get('/', (req, res) => {
  var messages = db.collection('scores').find();
  messages.toArray((err, result) => {
    if (err) return console.log(err)
    // result.forEach(function(element) {
    //     element.total = element.thumbUp - element.thumbDown;
    // });
    res.render('index.html', {messages: result})
  })
})

app.post('/scores', (req, res) => {
  db.collection('scores').save({computerWin: 0, humanWin: 0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/scores', (req, res) => {
  db.collection('scores')
  .findOneAndUpdate({computerWin: req.body.td, humanWin: req.body.humanScore}, {
    $inc: {
      humanWin: 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/scores2', (req, res) => {
  db.collection('scores')
  .findOneAndUpdate({computerWin: req.body.computerScore, humanWin: req.body.humanScore}, {
    $inc: {
        computerWin: 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({computerWin: req.body.computerScore, humanWin: req.body.humanScore}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Score deleted!')
  })
})
