#define BUTTON_PIN_1 2
#define BUTTON_PIN_2 4

int potpin = 0;
int val;  

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN_1, INPUT_PULLUP);
  pinMode(BUTTON_PIN_2, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(BUTTON_PIN_1) == LOW) {
    Serial.println("BUTTON_1_PRESSED");
    delay(750);
  }

  
  if (digitalRead(BUTTON_PIN_2) == LOW) {
    Serial.println("BUTTON_2_PRESSED");
    delay(750);
  }

  if (val != analogRead(potpin)){
      val = analogRead(potpin);
      String potvalPrint = "POT_VALUE ";
      potvalPrint.concat(val);
      Serial.println(potvalPrint);
      delay(100);
  }
}