#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "Abood";
const char* password = "775853515";

// Initialize variables to hold sensor data
int mq4_value = 0;
int mq7_value = 0;

void setup() {
  Serial.begin(9600);  // Initialize Serial for communication with Arduino
  Serial.setTimeout(2000);  // Set timeout for reading from Arduino

  // Connect to WiFi
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Check if data is available from Arduino
  if (Serial.available()) {
    // Read the data from Arduino in the format "mq4_value,mq7_value"
    String data = Serial.readStringUntil('\n');
    int commaIndex = data.indexOf(',');
    if (commaIndex > 0) {
      mq4_value = data.substring(0, commaIndex).toInt();
      mq7_value = data.substring(commaIndex + 1).toInt();

      // Log values to Serial Monitor
      Serial.print("MQ-4: ");
      Serial.println(mq4_value);
      Serial.print("MQ-7: ");
      Serial.println(mq7_value);

      // Send data to the backend
      sendDataToServer(mq4_value, mq7_value);
    }
  }

  delay(5000);  // Delay before the next reading cycle
}

void sendDataToServer(int mq4, int mq7) {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    http.begin(client, "http://192.168.65.164:5000/update");  // Your backend IP
    http.addHeader("Content-Type", "application/json");

    String payload = "{\"mq4\":" + String(mq4) + ", \"mq7\":" + String(mq7) + "}";
    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0) {
      Serial.println("Data sent successfully!");
    } else {
      Serial.println("Failed to send data.");
    }

    http.end();
  } else {
    Serial.println("WiFi disconnected!");
  }
}