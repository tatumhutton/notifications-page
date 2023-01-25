const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();
const notifications = [
  {
    id: '1',
    message: 'New product launch',
    date: '2022-01-01'
  },
  {
    id: '2',
    message: 'Discount sale',
    date: '2022-01-15'
  },
  {
    id: '3',
    message: 'fire sale',
    date: '2022-01-15'
  }
];
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.static(path.join(__dirname, 'src')));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});


app.get('/api/notifications', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(notifications);
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
