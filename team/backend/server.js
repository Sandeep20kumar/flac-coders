const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');


   

const app = express();
const PORT = 5000;
app.use(cors());

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));


// Routes
const memberRoutes = require('./routes/members');
app.use('/api/members', memberRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/teamdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
