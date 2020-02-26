// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");
const { writeFile, playSoundFile } = require("./util");

const client = new textToSpeech.TextToSpeechClient();

/**
 * run this as
 *
 * GOOGLE_APPLICATION_CREDENTIALS=~/Downloads/alt-bots-0847f6eaebb9.json node index.js
 *
 *
 * @param {*} text
 */
async function speak(text) {
  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-AU", ssmlGender: "MALE" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3", pitch: -1, speakingRate: 1 }
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  // Write the binary audio content to a local file
  await writeFile(
    "the-last-thing-the-robot-said.mp3",
    response.audioContent,
    "binary"
  );

  console.log("Audio content written to: the-last-thing-the-robot-said.mp3");

  // play it out
  await playSoundFile("./the-last-thing-the-robot-said.mp3");

  console.log("done");
}

speak("hello, world! It is me, Robot. How's it going?");
