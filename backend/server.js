const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const matchRoutes = require('./routes/matches');
const betRoutes = require('./routes/bets');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/matches', matchRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

