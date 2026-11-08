import { keyboardListener } from "./eventListener.js";
import { languages } from "./config.js";

let currentLang = "en";
const terminalContent = document.getElementById("terminalContent");

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

    terminalContent.append(welcomeMessage);
}

function insertTerminalInput(path) {
    const cmdPrefix = document.createElement("div");
    cmdPrefix.classList.add("terminalLine");
    cmdPrefix.innerHTML = `
        <span class="terminalUsername">tijasp@dev<span>:<span>~${path || ""}</span>$</span></span>
            <pre><p></p></pre>
        <span class="terminalCursor"></span>`;

    terminalContent.append(cmdPrefix);
};

export function insertChar(key) {
    const lastLine = document.querySelector("#terminalContent > div:nth-last-child(1)");
    if (lastLine.classList.contains("commandOutput")) return;
    
    const username = lastLine.querySelector(".terminalUsername");
    const spaceLeft = lastLine.clientWidth - username.offsetWidth - 8;
    let typezone = lastLine.querySelector("p");

    if (typezone.scrollWidth + 16 >= spaceLeft && key != "Backspace") return;

    switch(key) {
        case " ":
            if (typezone.textContent.at(-1) === " ") break;
            typezone.textContent += " ";
            break;
        case "Backspace":
            typezone.textContent = (typezone.textContent.slice(0, -1));
            break;
        default:
            typezone.textContent += key;
            break;
    };
};

export function commandExec() {
    const lastLine = document.querySelector("#terminalContent > div:nth-last-child(1)");
    let command = lastLine.querySelector("p").textContent.trim();
    let oldCursor = document.querySelector(".terminalCursor");
    oldCursor.classList.remove("terminalCursor");

    loadingCommand();

    setTimeout(() => {
        oldCursor = document.querySelector(".terminalCursor");
        oldCursor.classList.remove("terminalCursor");

        switch(command) {
            case "help":
                insertLine(`${languages[currentLang].availableCmd} <br> `);
                insertLine(`about       -    ${languages[currentLang].aboutme}`);
                insertLine(`projects    -    ${languages[currentLang].projects}`);
                insertLine(`socials     -    ${languages[currentLang].socials} <br> `);
                insertLine(`clear       -    ${languages[currentLang].clear}`);
                insertLine(`language    -    ${languages[currentLang].availableCmd}`);
                insertTerminalInput(`/help`);
                break;

            case "about":
                insertLine(languages[currentLang].aboutmeCmdOutput);
                insertTerminalInput(`about`);
                break;

            case "projects":
                insertLine(`${languages[currentLang].projectCmdOutput1}<br> `);
                insertLine(`<a href="https://github.com/tijasp/To-Do-IT" target="_blank">To-Do IT</a>    -    ${languages[currentLang].projectCmdOutput2}`);
                insertLine(`<br>${languages[currentLang].projectCmdOutput3}`);
                insertTerminalInput(`projects`);
                break;

            case "socials":
                insertLine(`${languages[currentLang].socialsCmdOutput1}<br> `);
                insertLine(`<a href="https://github.com/tijasp" target="_blank">${languages[currentLang].socialsCmdOutput2}</a> ${languages[currentLang].socialsCmdOutput3}`);
                insertLine(`${languages[currentLang].socialsCmdOutput4}`);
                insertTerminalInput(`socials`);
                break;

            case "clear":
                clearTerminal();
                break;

            case "language":
                switchLanguage();
                break;

            default:
                insertLine(`${command} : ${languages[currentLang].cmdNotFound}`);
                insertTerminalInput(``);
                break;
        }
        autoScroll();
    }, 250);
    autoScroll();
};

function clearTerminal() {
    while (terminalContent.lastChild) {
        terminalContent.removeChild(terminalContent.lastChild);
    };
    insertWelcomeMessage();
    insertTerminalInput();
};

function switchLanguage() {
    currentLang = currentLang === "en" ? "fr" : "en";
    clearTerminal();
}

function insertLine(text) {
    let newLine = document.createElement("div");
    newLine.innerHTML = `<pre>${text}</pre>`;
    terminalContent.append(newLine);
};

function loadingCommand() {
    const newLine = document.createElement("div");
    newLine.classList.add("terminalLine");
    newLine.classList.add("commandOutput");
    terminalContent.append(newLine);

    const newCursor = document.createElement("span");
    newCursor.classList.add("terminalCursor");
    
    newLine.append(newCursor);
    terminalContent.append(newLine);
};

function autoScroll() {
    terminalContent.scrollTop = terminalContent.scrollHeight;
};

export function main() {
    insertWelcomeMessage();
    insertTerminalInput();
    keyboardListener();
};