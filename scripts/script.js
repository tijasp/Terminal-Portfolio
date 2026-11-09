import { keyboardListener } from "./eventListener.js";
import { languages } from "./config.js";

let currentLang = "en";
const terminalBody = document.getElementById("terminalBody");

function insertWelcomeMessage() {
    let welcomeMessage = document.createElement("div");

    let welcomeMsg2 = languages[currentLang].welcomeMsg2;
    if (currentLang === "fr") { welcomeMsg2 = welcomeMsg2.replace(" ", "") }

    if (window.matchMedia("(max-width: 480px)").matches) {
        welcomeMessage.innerHTML = `<pre>
Welcome to Tijasp OS

${languages[currentLang].welcomeMsg1}
${welcomeMsg2}
 `;
    } else {
        welcomeMessage.innerHTML = `<pre>
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
 `;
    }
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
            helpCommand();
            break;
        case "about":
            aboutCommand();
            break;
        case "projects":
            projectsCommand();
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

function helpCommand() {
    insertContent(`${languages[currentLang].help}`);
    insertTerminalInput(`/help`);
}

function aboutCommand() {
    if (window.matchMedia("(max-width: 480px)").matches) {
        insertContent(`${languages[currentLang].mobileAbout}`);
    } else {
        insertContent(`${languages[currentLang].about}`);
    }
    insertTerminalInput(`/about`);
}

function projectsCommand() {
    if (window.matchMedia("(max-width: 480px)").matches) {
        insertContent(`${languages[currentLang].mobileProjects}`);
    } else {
        insertContent(`${languages[currentLang].projects}`);
    }
    insertTerminalInput(`/projects`);
}

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