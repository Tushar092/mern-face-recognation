const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Image = require('./models/Image');
const { detectFaceEncoding, calculateEuclideanDistance } = require('./utils/deepstack');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/face_recognition')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Search route
app.post('/api/face/search', async (req, res) => {
  const { image } = req.body;
  const inputEncoding = await detectFaceEncoding(image);
  if (!inputEncoding) return res.status(400).json({ message: 'No face detected' });

  const images = await Image.find({});
  const matches = images.filter(img => calculateEuclideanDistance(inputEncoding, img.faceEncoding) < 0.6);
  const matchedImages = matches.map(m => `http://localhost:5000/${m.imageUrl}`);

  res.json({ matchedImages });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
