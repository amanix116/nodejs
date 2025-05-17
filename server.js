const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRoutes);


app.get('/update', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'update.html'));
  });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
