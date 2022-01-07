import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fetch from 'node-fetch'

const app = express()
app.set('view engine', 'ejs')
app.use(
  express.urlencoded({
    extended: true
  })
)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(__dirname + '/public'))

app.get('/', async (req, res) => {
	let url = 'https://backend.davidwahrenburg.de/api/work'
	
	fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (d) {
      console.log(d)
      res.render('index.ejs', {
        work: d,
        title: 'Arbeiten'
      })
    })
})

app.listen(process.env.PORT || 3030, (req, res) => {
  console.log('running on port 3030')
})
