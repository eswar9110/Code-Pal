document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("userInput");
    const messages = document.getElementById("messages");
    const micButton = document.getElementById("micButton");
    const sendButton = document.getElementById("sendButton");

    // Speech recognition setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    // Function to add messages
    const addMessage = (text, sender = "user") => {
        const message = document.createElement("div");
        message.classList.add("message", sender);
        message.textContent = text;

        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    };

    // Function to process commands
    
    const processCommand = (command) => {
        addMessage(command, "user");

        let response = "Sorry, I didn't understand that.";

        if (command.includes("hello") || command.includes("hi")) {
            response = "Hello! How can I assist you?";
        } else if (command.includes("open")) {
            const site = command.split("open ")[1];
            response = `Opening ${site}...`;
            window.open(`https://${site}.com`, "_blank");
        } else if (command.includes("time")) {
            response = `The current time is ${new Date().toLocaleTimeString()}.`;
        } else if (command.includes("date")) {
            response = `Today's date is ${new Date().toLocaleDateString()}.`;
        } else if (command.includes("google")) {
            const query = command.replace("google", "").trim();
            response = `Searching Google for ${query}...`;
            window.open(`https://www.google.com/search?q=${query}`, "_blank");
        }

        addMessage(response, "bot");
        speak(response);
    };

    // Text-to-speech function
    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    };

    // Mic button event
    micButton.addEventListener("click", () => {
        recognition.start();
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        processCommand(transcript.toLowerCase());
    };

    // Send button event
    sendButton.addEventListener("click", () => {
        const text = userInput.value.trim();
        if (text) {
            processCommand(text.toLowerCase());
            userInput.value = "";
        }
    });

    // Enter key event
    userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendButton.click();
        }
    });
});
