const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// подключение к базе Neon
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// модель ITR
const ITR = sequelize.define('ITR', {
  type: DataTypes.STRING,
  tag: DataTypes.STRING,
  system: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Open'
  }
});

// API
app.get('/api/itrs', async (req, res) => {
  const data = await ITR.findAll();
  res.json(data);
});

app.post('/api/itrs', async (req, res) => {
  const itr = await ITR.create(req.body);
  res.json(itr);
});

// запуск
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 10000, () => {
    console.log('Server running');
  });
});
