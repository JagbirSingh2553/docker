const axios = require('axios');
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 6000;

app.use(express.json());

app.post('/calculate', (req, res) => {
  const { file, product } = req.body;
  
  console.log("file",file);
  if (!file) {
    return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
  }

  const filePath = `./file/${file}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ file:file, error: 'File not found.' });
  }

  axios
    .post('http://container2:7000/calculate', { file, product }) // Pass the file path to the second API
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json({file:file, error: 'Input file not in CSV format.' });
    });
});

app.listen(PORT, () => {
  console.log(`First API listening on port ${PORT}`);
});
