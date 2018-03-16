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


//express get request that requests object from database
app.get('/', (req, res) => {
  var messages = db.collection('scores').find();
  messages.toArray((err, result) => {
    if (err) return console.log(err)

    res.render('index.ejs', {messages: result})
  })
})

app.get('/scores', (req, res) => {

  db.collection('scores').find({name: req.body.name,}).toArray(function(err, results) {
    console.log(results)
    res.json(results)
  })

})

app.post('/scores', (req, res) => {
  db.collection('scores').save({name:req.body.name, computerWin: 0, humanWin: 0, humanPlay: null, botsWeapon: null}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/scores', (req, res) => {
    console.log(req.body)
  db.collection('scores')
  .findOneAndUpdate({name:req.body.name}, {
     name: req.body.name,
     computerWin: req.body.computerScore,
     humanWin: req.body.humanScore,
     botsWeapon: req.body.botsWeapon,
     playersWeapon: req.body.humanPlay
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
//
//
// app.delete('/messages', (req, res) => {
//   db.collection('messages').findOneAndDelete({name:req.body.name, computerWin: req.body.computerScore, humanWin: req.body.humanScore}, (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('Score deleted!')
//   })
// })
