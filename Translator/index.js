//To make this work, navigate to your lambda file in your alexa skill.
//Open the command prompt in this location and run "npm install" to 
//ensure the node packages we need are installed there


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
//const SerialPort = require('serialport');
//const parser = new SerialPort('COM3', { baudRate: 9600 }).pipe(new (require('@serialport/parser-readline'))({ delimiter: '\n' }));

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

//Run an intent and process the response
handler(
    //What intent do we want to run?
    buildRequest('ArduinoInsertIntent', {
        //If the intent has slots, add them here
        item: { value: 'hammer' }
        //"item" is the name of the slot, "hammer" is the value we're passing
    }),
    
    {}, (err, response) => {

        //Print an error if we have one
        if (err) console.error('Error:', err);
        //Otherwise, process the output
        else
        {
            //Output Alexa's text response
            const speechTextRaw = response?.response?.outputSpeech?.text || response?.response?.outputSpeech?.ssml || 'No spoken text found';;
            //If Alexa's text response has <speak> tags, remove those.
            const speechText = speechTextRaw.replace(/^<speak>/i, '').replace(/<\/speak>$/i, '');

            //If you would rather have the entire alexa response, use: console.log('Alexa Skill Response:\n', JSON.stringify(response, null, 2));

            console.log(speechText);
        }
    }
);

//Run server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});