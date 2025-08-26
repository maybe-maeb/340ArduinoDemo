This is a project to create an Alexa skill and an arduino which talk through a server (called the translator).

Eventually, the arduino input will trigger the server to input information into a database. Later, Alexa can be prompted to return information from the database.

How to use it:
1. Build the arduino circuit from the image in the Arduino folder
2. Build arduino_controller.ino to your arduino, then close your IDE.
3. Run "node index.js" in the Translator folder.
4. When you press the button, it should output "Pong!" to your server's console.


How it works:
1. The arduino script outputs BUTTON_PRESSED to COM3 when the button is pressed
2. The translator (server) watches COM3 for the BUTTON_1_PRESSED message. When it sees it, it runs PingIntent on the Alexa skill
3. Alexa returns "Pong!" to the server, which prints it to the console.

Additional:

There is also a BUTTON_2_PRESSED message that runs ArduinoInsertIntent on the Alexa Skill with a slot.

There is also a POT_VALUE message that runs ArduinoInsertIntent with a slot passed from the arduino (a potentiometer).
