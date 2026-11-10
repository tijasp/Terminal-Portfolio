import { helpCommand, aboutCommand, projectsCommand, socialsCommand, clearCommand, languageCommand, cmdNotFound, currentLang } from "./commands.js";
import { startEventListeners } from "./eventListener.js";
import { languages } from "./config.js";

const TERMINAL_BODY = document.getElementById("terminalBody");

export function insertWelcomeMessage() {
    const selectedLanguage = currentLang;
    let welcomeMessage = document.createElement("div");

    let welcomeMsg2 = languages[selectedLanguage].welcomeMsg2;
    if (selectedLanguage === "fr") { welcomeMsg2 = welcomeMsg2.replace(" ", "") }

    if (window.matchMedia("(max-width: 480px)").matches) {
        welcomeMessage.innerHTML = `<pre>
Welcome to Tijasp OS
${languages[selectedLanguage].welcomeMsg1} ${welcomeMsg2}
 `;
    } else {
        welcomeMessage.innerHTML = `<pre>
                   .-.
             .-'&#96;&#96;(|||)
          ,&#96;&#92; &#92;    &#96;-&#96;.
         /   &#92; '&#96;&#96;-.   &#96;
       .-.  ,       &#96;___:
      (:::) :        ___                ${languages[selectedLanguage].welcomeMsg1}
       &#96;-&#96;  &#96;       ,   :        ${languages[selectedLanguage].welcomeMsg2}
         &#92;   / ,..-&#96;   , 
          &#96;./ /    .-.&#96;
             &#96;-..-(   ) 
                   &#96;-&#96; 
 `;
    }
    TERMINAL_BODY.append(welcomeMessage);
    insertTerminalInput();
};

export function insertTerminalInput(path) {
    TERMINAL_BODY.insertAdjacentHTML("beforeend", `
        <div class="terminalLine">
            <span class="terminalUsername">tijasp@dev<span>:<span>~${path || ""}</span>$</span></span>
            <input type="text" autofocus></input>
        <div>
        `);
    focusOnLastInput();
};

export function focusOnLastInput() {
    const lastInput = TERMINAL_BODY.querySelector("div:nth-last-child(1) > input");
    lastInput.focus();
}

export function insertContent(text) {
    TERMINAL_BODY.insertAdjacentHTML("beforeend", `<pre>${text}</pre>`);
};

function autoScroll() {
    TERMINAL_BODY.scrollTop = TERMINAL_BODY.scrollHeight;
};

export function commandExec() {
    const command = TERMINAL_BODY.querySelector("div:nth-last-child(1) > input").value.toLowerCase();

    switch(command) {
        case "help":
            helpCommand();
            break;
        case "about":
            aboutCommand();
            break;
        case "projects":
            projectsCommand();
            break;
        case "socials":
            socialsCommand();
            break;
        case "clear":
            clearCommand();
            break;
        case "language":
            languageCommand();
            break;
        default:
            cmdNotFound(command);
            break;
    }
    autoScroll();
};

export function main() {
    insertWelcomeMessage();
    startEventListeners();
};