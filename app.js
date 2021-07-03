// require packages used in the project
const express = require('express')
const app = express()
// ./代表說在app.js同一層裡面找restaurant.json檔案
const restaurantsList = require('./restaurant.json')
const port = 3000

// require express-handlebars here
//沒有給 ./ ，代表去node_modules裡面去找
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantsList.results})
})

//params, 用:代表變數
app.get('/restaurants/:restaurant_id', (req, res) => {
  
  //箭頭函式
  const restaurant = restaurantsList.results.filter(restaurant => restaurant.id === Number(req.params.restaurant_id))

  // const restaurant = restaurantsList.results.filter(function(restaurant){
  //   //restaurant.id是數值，req.params.restaurant_id是字串
  //   return restaurant.id === Number(req.params.restaurant_id)
  // })
  res.render('show', { restaurant: restaurant[0] })  //restauran是陣列，因此restaurant[0]
})

// setting static files
app.use(express.static('public'))

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})