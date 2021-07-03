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

app.get('/search', (req, res) => {
  //箭頭函式
  //req.query 可以得到 EX:  req.query {keyword:'jurassic'},網址上?之後的內容可以透過req.query取得
  //toLowerCase()輸入大小寫都可以搜尋的到
  const restaurants = restaurantsList.results.filter(restaurant => 
    restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) ||
    restaurant.name_en.toLowerCase().includes(req.query.keyword.toLowerCase())  ||
    restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase())
  )
  //keyword: req.query.keyword  可以保留搜尋的文字在input裡面
  res.render('index', { restaurants: restaurants, keyword: req.query.keyword})
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