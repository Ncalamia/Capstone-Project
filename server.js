// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const db = mongoose.connection
require('dotenv').config()

const ReviewsSchema = require('./models/reviewsSchema.js')
const reviewsSeedData = require('./models/reviewsData.js')


app.set("port",process.env.PORT || 3001)

// MIDDLEWARE
app.use(express.json())
app.use(cors())




// CONNECTIONS
const mongoDB = 'mongodb://localhost:27017/javacoffee'

//For local connection
// mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongod...')
})



// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
// const PORT = process.env.PORT || 3001;

//For connection to mongoDB Atlas
mongoose.connect( MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Database
//___________________





//___________________
// Routes
//___________________

// Adding Seed Data for reviews
app.get('/java/reviewsSeedData', (req, res) => {
    ReviewsSchema.create(reviewsSeedData, (err, createdReviewsData) => {
        res.json(createdReviewsData)
    })
})



// Create new review
app.post('/java/review', (req, res) => {
    ReviewsSchema.create(req.body, (err, createdReview) => {
          res.json(createdReview)
      })
  })


//Route for home page, shows reviews
app.get('/java', (req, res) => {
	ReviewsSchema.find({}, (err, reviews) => {
	     res.json(reviews)
  })
})


// Update review
app.put('/java/review/:id', (req, res) => {
    ReviewsSchema.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedReview) => {
        res.json(updatedReview)
    })
})



// Delete review
app.delete('/java/review/:id', (req, res) => {
    ReviewsSchema.findByIdAndRemove(req.params.id, (error, deletedReview) => {
        res.json(deletedReview)
    })
})






//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.redirect('/java');
});


//___________________
//Listener
//___________________

app.listen(app.get('port'), ()=>{console.log(`"listening on ${app.get('port')}"`)
})