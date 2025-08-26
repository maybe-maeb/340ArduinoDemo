//RUN THE FOLLOWING COMMANDS:
//"npm install" in Alexa/lambda
//"npm install serialport" in Translator

//Note: You won't be able to upload new code to your arduino if your server is running.
//AND your server won't run if your arduino IDE is open. 
//So if you are making changes to one, make sure the other is closed.

//Heading
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server running.\n');
});

//Alexa heading
const skill = require('../Alexa/lambda/index'); // Path to your Alexa skill
const handler = skill.handler;

//Arduino heading
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

// Replace 'COM3' with your Arduino port (or /dev/ttyUSB0 on Linux/macOS)
const port = new SerialPort({ path: 'COM3', baudRate: 9600 });

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

//Alexa funtionality
//Build Alexa requests dynamically
function buildRequest(intentName = null, slots = {}) {
    const request = {
        version: '1.0',
        session: { new: true, sessionId: 'mock-session' },
        request: {
            type: 'IntentRequest',
            requestId: 'mock-request-id',
            locale: 'en-US',
            timestamp: new Date().toISOString()
        }
    };

    if (intentName) {
        request.request.intent = { name: intentName, slots };
    }

    console.log("Running intent " + intentName);
    return request;
}

parser.on('data', line => {
  if (line.trim() !== 'BUTTON_PRESSED') return;

  const mockRequest = {
    version: '1.0',
    session: { new: true, sessionId: 'mock-session' },
    request: {
      type: 'IntentRequest',
      requestId: 'mock-request-id',
      locale: 'en-US',
      timestamp: new Date().toISOString(),
      intent: { name: 'PingIntent', slots: {} }
    }
  };

  handler(mockRequest, {}, (err, res) => {
    if (err) return console.error(err);
    const speech = res?.response?.outputSpeech?.text || res?.response?.outputSpeech?.ssml || '';
    console.log(speech.replace(/^<speak>/i, '').replace(/<\/speak>$/i, ''));
  });
});


//Run server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});