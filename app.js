const express = require('express');
const hbs = require('hbs');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();
const say = require('say');


app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

// Routes go here!
app.get('/',(req, res, next) => {
  res.render('index')
})

app.post("/",(req, res, next)=> {
  const check_num = req.body.numero;
  const axios = require('axios');

  axios.get(`http://api.elpais.com/ws/LoteriaNavidadPremiados?n=${check_num}`)
    .then(response => {
      const json = JSON.parse(response.data.split('=')[1])
      const numero = json.numero;
      const premio = parseInt(json.premio);

      if (premio === 0) {
        say.speak(`Mierda pa ti`)
      } else {
        say.speak(`${premio} ¡eeeeeuros!`)
      }
      
      res.render('result',{numero, premio});
       })
})

app.listen(PORT, () => {
  console.info(`App listen at ${PORT} port`);
});