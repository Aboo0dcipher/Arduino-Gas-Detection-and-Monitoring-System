const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Enable CORS for all requests
app.use(cors());

// Set Content Security Policy headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; font-src 'self' data:; img-src 'self' data:;"
  );
  console.log('Raw data received:', req.body);
  next();
});


// Store sensor data
let sensorData = {
  mq7: 0,
  mq4: 0
};




// Adjusted calibration constants for more realistic ppm values
const mq4_a = 100, mq4_b = -0.42;  // Methane (MQ-4)
const mq7_a = 40, mq7_b = -0.36;   // Carbon Monoxide (MQ-7)

// Function to convert raw analog values to ppm using Rs/R0 ratio
function convertToPPM(rawValue, a, b) {
  const vRL = (rawValue / 1023) * 5.0;  // Convert analog reading to voltage
  const rs = (5.0 - vRL) / vRL;  // Calculate Rs (sensor resistance)
  const r0 = 1;  // Assume R0 = 1 for simplification
  const rs_r0_ratio = rs / r0;  // Calculate Rs/R0 ratio
  const ppm = a * Math.pow(rs_r0_ratio, b);  // Apply the conversion formula

  // Cap ppm to reasonable limits (0 to 500 ppm)
  return Math.max(0, Math.min(500, Math.round(ppm)));
}

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Endpoint to receive sensor data from NodeMCU
app.post('/update', (req, res) => {
  let { mq7, mq4 } = req.body;

  // Convert raw values to ppm using the updated formula
  const mq4_ppm = convertToPPM(mq4, mq4_a, mq4_b);
  const mq7_ppm = convertToPPM(mq7, mq7_a, mq7_b);

  sensorData.mq4 = mq4_ppm;
  sensorData.mq7 = mq7_ppm;

  console.log('Data received and converted:', { mq4_ppm, mq7_ppm });
  res.json({ message: 'Data received and converted successfully' });
});

// Endpoint to send sensor data to the frontend
app.get('/data', (req, res) => {
  res.json(sensorData);
});

// Serve static files (e.g., index.html, script.js)
app.use(express.static(__dirname));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
