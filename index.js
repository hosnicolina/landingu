const path = require('path')
const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const User = require('./models/User')

// Variables de entorno
require('dotenv').config({ path: '.env' })

// puerto
const port = process.env.PORT;

// cors
app.use(cors("*"))

// habilitar bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// activar promise en mongoose
mongoose.Promise = global.Promise

// DimeloVipUser
// Dimelo@2020

// conexión a mongoose
mongoose.connect(process.env.BBDD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err, _) => {
  if (err) {
    console.log('Error de connexion')
  } else {
    console.log('Conexion correcta')
  }
})

// add middlewares
app.use('/',express.static(path.join(__dirname, "..", "server/build")));
app.use('/',express.static("public"));


const Router = () => {

  router.get('/',(req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "server/build", "index.html"));
  });
  
  router.post('/users', async (req, res, next) => {
  
      res.json({"hola":"hola"});
  
      next()
  
      const user = new User(req.body);
  
      try {
          await user.save()
          res.json({success: true})
      } catch (e) {
          res.status(500).json({success: false})
          next()
      }
  })

  return router
}

app.use('/', Router())

app.listen(port)