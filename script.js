const RANDOM_API_URL = "https://official-joke-api.appspot.com/random_joke";
const randomGenerateButton = document.querySelector("#randomButton");
const setup = document.querySelector("#setup");
const punchLine = document.querySelector("#punchline");
const synth = speechSynthesis;

randomGenerateButton.onclick = async () => {
  try {
    if (!synth.speaking) {
      const response = await fetch(RANDOM_API_URL);
      const data = await response.json();
      if (response.ok) {
        setup.innerText = data.setup;
        punchLine.innerText = data.punchline;
        textToSpeech(setup.innerText);
        textToSpeech(punchline.innerText);
      } else {
        setup.innerText = "Error fetching joke.";
        punchLine.innerText = "";
      }
    }
  } catch (error) {
    console.error("Error fetching random joke:", error);
    setup.innerText = "Error fetching joke.";
    punchLine.innerText = "";
  }
};

const textToSpeech = (text) => {
  const utternance = new SpeechSynthesisUtterance(text);
  synth.speak(utternance);
};
