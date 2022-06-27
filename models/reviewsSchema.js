const mongoose = require('mongoose')

const reviewsSchema = new mongoose.Schema (
  {
		name: String,
		address: String,
		review: String,
		rating: String,
		location: String,
		image: String,
        price: String
  }
)

const Review = mongoose.model("Review", reviewsSchema)
module.exports = Review