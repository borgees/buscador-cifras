const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const {sequelize} = require('./models');

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

require('./passport');

require('./routes')(app);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

sequelize.sync().then(() => {
  app.listen(config.port);
  console.log(`Server started on port ${config.port}`)
});
