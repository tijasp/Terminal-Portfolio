import { keyboardListener } from "./eventListener.js";
import { languages } from "./config.js";

let currentLang = "en";
const terminalBody = document.getElementById("terminalBody");

function insertWelcomeMessage() {
    let welcomeMessage = document.createElement("div");
    welcomeMessage.innerHTML = `
    <pre>
                   .-.
             .-'&#96;&#96;(|||)
          ,&#96;&#92; &#92;    &#96;-&#96;.
         /   &#92; '&#96;&#96;-.   &#96;
       .-.  ,       &#96;___:
      (:::) :        ___                ${languages[currentLang].welcomeMsg1}
       &#96;-&#96;  &#96;       ,   :        ${languages[currentLang].welcomeMsg2}
         &#92;   / ,..-&#96;   , 
          &#96;./ /    .-.&#96;
             &#96;-..-(   ) 
                   &#96;-&#96; 
<br>`;

    terminalBody.append(welcomeMessage);
    insertTerminalInput();
}

function insertTerminalInput(path) {
    terminalBody.insertAdjacentHTML("beforeend", `
        <div class="terminalLine">
            <span class="terminalUsername">tijasp@dev<span>:<span>~${path || ""}</span>$</span></span>
            <input type="text" autofocus></input>
        <div>
        `);
    let newInput = document.querySelector("#terminalBody > div:nth-last-child(1) > input");
    newInput.focus();
};

export function commandExec() {
    const command = document.querySelector("#terminalBody > div:nth-last-child(1) > input").value.toLowerCase();

    switch(command) {
        case "help":
            insertContent(`${languages[currentLang].help}`);
            insertTerminalInput(`/${command}`);
            break;
        case "about":
            insertContent(`${languages[currentLang].about}`);
            insertTerminalInput(`/${command}`);
            break;
        case "projects":
            insertContent(`${languages[currentLang].projects}`);
            insertTerminalInput(`/${command}`);
            break;
        case "socials":
            insertContent(`${languages[currentLang].socials}`);
            insertTerminalInput(`/${command}`);
            break;
        case "clear":
            clearTerminal();
            break;
        case "language":
            switchLanguage();
            break;
        default:
            insertContent(`${command} : ${languages[currentLang].cmdNotFound}`);
            insertTerminalInput(``);
            break;
    }
    autoScroll();
};

function clearTerminal() {
    terminalBody.innerHTML = "";
    insertWelcomeMessage();
};

function switchLanguage() {
    currentLang = currentLang === "en" ? "fr" : "en";
    clearTerminal();
}

function insertContent(text) {
    terminalBody.insertAdjacentHTML("beforeend", `<pre>${text}</pre>`);
};

function autoScroll() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
};

export function main() {
    insertWelcomeMessage();
    keyboardListener();
};