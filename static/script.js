const input = document.getElementById("message");

input.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});


async function sendMessage() {

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    const chatbox = document.getElementById("chatbox");

    // User message
    chatbox.innerHTML += `
        <div class="message">
            <div class="avatar">👤</div>

            <div class="bubble">
                ${message}
            </div>
        </div>
    `;

    input.value = "";

    // Loading message
    const loading = document.createElement("div");

    loading.className = "message";

    loading.innerHTML = `
        <div class="avatar">🤖</div>

        <div class="bubble">
            Thinking...
        </div>
    `;

    chatbox.appendChild(loading);

    chatbox.scrollTop = chatbox.scrollHeight;


    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        const data = await response.json();

        loading.querySelector(".bubble").innerText =
            data.reply || data.response || data.error;


    } catch (error) {

        loading.querySelector(".bubble").innerText =
            "Sorry, something went wrong.";

    }

    chatbox.scrollTop = chatbox.scrollHeight;
}
