//___________________
// Routes


// Adding Seed Data for reviews
app.get('/java/reviewsSeed', (req, res) => {
    ReviewsSchema.create(reviewSeedData, (err, createdReviewsData) => {
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
	ReviewsSchema.find({}, (err, review) => {
	     res.json(review)
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