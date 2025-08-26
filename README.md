In its current state, this is what this repository does and how it works.

How to use it:
Build the arduino circuit from the image in the Arduino folder
Build arduino_controller.ino to your arduino, then close your IDE.
Run "node index.js" in the Translator folder.
When you press the button, it should output "Pong!" to your server's console.

How it works:
The arduino script outputs BUTTON_PRESSED to COM3 when the button is pressed
The translator (server) watches COM3 for the BUTTON_PRESSED message. When it sees it, it runs PingIntent on the Alexa skill
Alexa returns "Pong!" to the server, which prints it to the console.
