# Arduino Gas Detection and Monitoring System

A real-time hazardous gas monitoring system that detects carbon monoxide (CO) and methane (CH4) using Arduino UNO and MQ sensors. The system provides real-time data analysis, alerts, and actionable suggestions through a web application interface.

## 🔍 Features

- Real-time monitoring of carbon monoxide (CO) and methane (CH4) levels
- Customizable threshold settings for each gas
- Interactive visualizations with bar graphs and line charts
- Automated alerts when gas concentrations exceed safe levels
- Actionable suggestions to reduce harmful gas exposure
- Low-cost implementation making it accessible for home use

## 📋 Hardware Setup

Our system uses the following components assembled on a breadboard:

![image](https://github.com/user-attachments/assets/2c59c9e5-3875-4d71-a093-79b65473c96e)
![image](https://github.com/user-attachments/assets/a25b0e54-6306-44bc-9d3f-0f65266d5088)


### Hardware Requirements

- Arduino UNO
- MQ-4 Gas Sensor (Methane Detection)
- MQ-7 Gas Sensor (Carbon Monoxide Detection)
- ESP8266 Wi-Fi Module
- Breadboard and connecting wires
- USB cable for Arduino connection
- Power supply (5V)

## 💻 Software Architecture

The system follows a straightforward data flow architecture:

![image](https://github.com/user-attachments/assets/3a0a77f0-1358-49a5-a9e0-63beffeeb0e7)


1. **Sensor Data**: MQ-4 and MQ-7 sensors collect gas concentration data
2. **Arduino**: Processes the sensor readings
3. **ESP8266 WiFi Module**: Transmits data to the web application
4. **Web App**: Displays data and analyzes readings
5. **Suggestions**: Provides actionable recommendations based on gas levels

### Software Requirements

- Arduino IDE (1.8.x or later)
- Required Arduino Libraries:
  - ESP8266WiFi
  - WiFiClient
  - ESP8266WebServer
  - ArduinoJson
- Web browser (Chrome, Firefox, Edge, Safari)

## 📊 Web Interface

The web interface provides a comprehensive dashboard for monitoring gas levels:


![image](https://github.com/user-attachments/assets/5ed51027-73e5-447d-ac18-72dff770c6ef)

![image](https://github.com/user-attachments/assets/6ad7958d-1e80-457e-9406-bdb779ec06fb)


The dashboard includes:
- **Top Header**: Gas Sensor Dashboard title
- **Left Side**: 
  - Threshold settings for both gases
  - Current sensor readings
  - Status alerts and recommendations
- **Right Side**:
  - Bar graph showing current gas concentrations
  - Line graph showing historical gas levels over time

## 🛠️ Installation

### Arduino Setup

1. **Install Arduino IDE**
   - Download from [arduino.cc](https://www.arduino.cc/en/software)
   - Install following the instructions for your operating system

2. **Install ESP8266 Board Package**
   - Open Arduino IDE
   - Go to File > Preferences
   - Add the following URL to the "Additional Boards Manager URLs" field:
     ```
     http://arduino.esp8266.com/stable/package_esp8266com_index.json
     ```
   - Go to Tools > Board > Boards Manager
   - Search for "ESP8266" and install the latest version

3. **Install Required Libraries**
   - Go to Tools > Manage Libraries
   - Search for and install:
     - ESP8266WiFi
     - WiFiClient
     - ESP8266WebServer
     - ArduinoJson

4. **Windows-Specific Drivers**
   - For Arduino UNO: CH340 or FTDI drivers might be required depending on your board
   - Download CH340 drivers from [here](https://sparks.gogo.co.nz/ch340.html)
   - Download FTDI drivers from [here](https://ftdichip.com/drivers/vcp-drivers/)

### Hardware Connections

1. **Connect the MQ-4 sensor**:
   - VCC to 5V on Arduino
   - GND to GND on Arduino
   - Analog output to A0 on Arduino

2. **Connect the MQ-7 sensor**:
   - VCC to 5V on Arduino
   - GND to GND on Arduino
   - Analog output to A1 on Arduino

3. **Connect the ESP8266 module**:
   - VCC to 3.3V on Arduino
   - GND to GND on Arduino
   - RX to TX on Arduino
   - TX to RX on Arduino
   - CH_PD/EN to 3.3V on Arduino.


##NOTE:
1.Ensure U have run the server first


2.Install the packages required for the server "npm install"

## 🚀 Usage

1. **Upload the code**:
   - Open the Arduino sketch (.ino file) in Arduino IDE
   - Select the correct board and port from Tools menu
   - Upload the code to the Arduino

2. **Access the web interface**:
   - Connect to the WiFi network created by the ESP8266 module
     - Default SSID: "GasMonitor"
     - Default Password: "12345678"
   - Open a web browser and navigate to `http://192.168.4.1`
   - Alternatively, if configured to connect to your home network, find the IP address from serial monitor and access it directly

3. **Set threshold values**:
   - Use the sliders or input fields to set the threshold values for CO and CH4
   - Click "Save" to store your settings

4. **Monitor gas levels**:
   - The system will continuously monitor gas levels and display them in real-time
   - Bar graphs and line charts show current and historical data
   - Alerts will appear when gas levels exceed your thresholds
   - Follow the suggestions provided to reduce harmful gas levels

## 🔧 Troubleshooting

- **Arduino not connecting**: 
  - Ensure proper drivers are installed
  - Check that the correct port is selected in Arduino IDE
  - Try a different USB cable or port

- **Sensors not detecting gases**:
  - Allow 24-48 hours for initial calibration of MQ sensors
  - Check wiring connections
  - Verify power supply is adequate

- **Web interface not accessible**:
  - Check WiFi connection
  - Verify the IP address in serial monitor
  - Restart the Arduino and ESP8266 module

## 🔄 Future Improvements

- Expanding to detect additional gases (NO2, SO2)
- Implementing machine learning for predictive analysis
- Enhancing user engagement through gamification
- Developing mobile applications for iOS and Android
- Adding cloud data storage for long-term analysis

## 👨‍💻 Contributors

- Abdulaleh Alolofi
- Ali Altam
- Aarya Balwadker
- Ahmed Mohammed

## 📚 References

[1] K. Altheiab, "Methodology for Monitoring Toxic Gases Internet of Things (IOT) Technology," 2018.

[2] N. A. Mohd Bakri et al., "Mobile Carbon Monoxide Monitoring System Based on Arduino-Matlab for Environmental Monitoring Application," 2015.

[3] K. B. K. Sai et al., "IOT based Air Quality Monitoring System Using MQ135 and MQ7 with Machine Learning Analysis," 2019.


