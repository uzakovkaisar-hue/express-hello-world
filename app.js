const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());


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

const ITR = sequelize.define('ITR', {
  type: DataTypes.STRING,
  tag: DataTypes.STRING,
  system: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Open'
  }
});

app.get('/api/itrs', async (req, res) => {
  const data = await ITR.findAll();
  res.json(data);
});

app.post('/api/itrs', async (req, res) => {
  const itr = await ITR.create(req.body);
  res.json(itr);
});

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 10000, () => {
    console.log('Server running');
  });
});
