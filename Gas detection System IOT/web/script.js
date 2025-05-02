// Global variables for Chart.js
let barChart, lineChart;
let mq4Data = [];
let mq7Data = [];
let timestamps = [];

// Adjustable threshold inputs
const mq4ThresholdInput = document.getElementById('mq4-threshold');
const mq7ThresholdInput = document.getElementById('mq7-threshold');

// Function to update sensor values in the UI
function updateSensorValues(mq4_ppm, mq7_ppm) {
    document.getElementById('mq4').innerText = `${mq4_ppm} ppm`;
    document.getElementById('mq7').innerText = `${mq7_ppm} ppm`;
}

// Function to update the Bar Chart
function updateBarChart(mq4, mq7) {
    const ctx = document.getElementById('barChart').getContext('2d');
    if (barChart) {
        barChart.destroy();  // Destroy existing chart before creating a new one
    }
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Methane (MQ-4)', 'CO (MQ-7)'],
            datasets: [{
                label: 'Gas Levels (ppm)',
                data: [mq4, mq7],
                backgroundColor: ['#FF5733', '#007BFF'],
                borderColor: ['#C70039', '#001F3F'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1000
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#333',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

// Function to update the Line Chart
function updateLineChart(mq4, mq7) {
    const ctx = document.getElementById('lineChart').getContext('2d');
    
    // Push new data to arrays
    const timestamp = new Date().toLocaleTimeString();
    mq4Data.push(mq4);
    mq7Data.push(mq7);
    timestamps.push(timestamp);

    // Limit the number of data points to 10 for better visualization
    if (mq4Data.length > 10) {
        mq4Data.shift();
        mq7Data.shift();
        timestamps.shift();
    }

    if (lineChart) {
        lineChart.destroy();  // Destroy existing chart before creating a new one
    }
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [
                {
                    label: 'Methane (MQ-4) ppm',
                    data: mq4Data,
                    borderColor: '#FF5733',
                    backgroundColor: 'rgba(255, 87, 51, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'CO (MQ-7) ppm',
                    data: mq7Data,
                    borderColor: '#007BFF',
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1000
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#333',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

// Function to display suggestions based on sensor data
function displaySuggestions(mq4, mq7) {
    const mq4Threshold = parseInt(mq4ThresholdInput.value, 10);
    const mq7Threshold = parseInt(mq7ThresholdInput.value, 10);
    const suggestionBox = document.getElementById('suggestion');
    let suggestionText = "";

    if (mq4 > mq4Threshold) {
        suggestionText += "⚠️ High Methane Level! Ensure ventilation or turn off gas sources. ";
    }

    if (mq7 > mq7Threshold) {
        suggestionText += "⚠️ High Carbon Monoxide Level! Open windows or move to a safer area.";
    }

    suggestionBox.innerText = suggestionText || "✅ Gas levels are normal.";
}

// Function to show notification alerts
function showNotification(mq4, mq7) {
    const mq4Threshold = parseInt(mq4ThresholdInput.value, 10);
    const mq7Threshold = parseInt(mq7ThresholdInput.value, 10);

    if (mq4 > mq4Threshold || mq7 > mq7Threshold) {
        if (Notification.permission === 'granted') {
            new Notification('Gas Sensor Alert', {
                body: 'High gas levels detected! Check the dashboard for details.',
                icon: 'https://example.com/alert-icon.png'
            });
        }
    }
}

// Request permission for notifications
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// Function to fetch data from the backend
async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/data');
        if (response.ok) {
            const data = await response.json();
            console.log('Fetched data:', data);

            // Update sensor values in the UI
            updateSensorValues(data.mq4, data.mq7);

            // Update the bar chart with current data
            updateBarChart(data.mq4, data.mq7);

            // Update the line chart with current data
            updateLineChart(data.mq4, data.mq7);

            // Display suggestions based on sensor readings
            displaySuggestions(data.mq4, data.mq7);

            // Show notification if thresholds are exceeded
            showNotification(data.mq4, data.mq7);
        } else {
            console.error('Failed to fetch data from backend:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch data every 5 seconds
setInterval(fetchData, 5000);
