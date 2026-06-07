const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let feedbacks = [];
let nextId = 1;

app.post('/feedback', (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ 
      success: false, 
      error: 'Name and message are required' 
    });
  }

  const newFeedback = {
    id: nextId++,
    name,
    message,
    createdAt: new Date().toISOString()
  };

  feedbacks.push(newFeedback);
  res.status(201).json({ success: true, data: newFeedback });
});

app.get('/feedback', (req, res) => {
  res.status(200).json({ success: true, data: feedbacks });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
