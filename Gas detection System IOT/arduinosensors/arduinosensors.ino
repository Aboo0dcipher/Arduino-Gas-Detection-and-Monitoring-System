#define MQ4_PIN A0  // Analog pin for MQ-4
#define MQ7_PIN A1  // Analog pin for MQ-7

void setup() {
  Serial.begin(9600);  // Initialize serial communication
}

void loop() {
  // Read analog values from sensors
  int mq4_value = analogRead(MQ4_PIN);
  int mq7_value = analogRead(MQ7_PIN);

  // Send data to NodeMCU via Serial
  Serial.print(mq4_value);
  Serial.print(",");
  Serial.println(mq7_value);

  delay(3000);  // Delay for readability
}
