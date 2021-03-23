const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const exphbs = require('express-handlebars')

app.use(cors());
app.use(morgan('dev'));
app.options('*', cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '25mb'
}));

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require('./db/index');
app.use(express.static("public")); 

// router
const indexRouter = require('./controllers/index');
app.use('', indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Hello, List Share! listening on port ${port}!`))