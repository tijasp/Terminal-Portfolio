import { keyboardListener } from "./eventListener.js";

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
    (:::) :        ___    
     &#96;-&#96;  &#96;       ,   :           Type <span style="color: var(--green); font-weight: 700; text-decoration: underline; text-decoration-color: white">help</span>
       &#92;   / ,..-&#96;   ,     to see available commands
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
    let command = lastLine.querySelector("p").textContent;
    let oldCursor = document.querySelector(".terminalCursor");
    oldCursor.classList.remove("terminalCursor");

    if (command.at(-1) === " ") command = command.slice(0, -1);

    const newLine = document.createElement("div");
    newLine.classList.add("terminalLine");
    newLine.classList.add("commandOutput");
    terminalContent.append(newLine);

    const newCursor = document.createElement("span");
    newCursor.classList.add("terminalCursor");
    
    newLine.append(newCursor);
    terminalContent.append(newLine);

    setTimeout(() => {
        oldCursor = document.querySelector(".terminalCursor");
        oldCursor.classList.remove("terminalCursor");

        switch(command) {
            case "clear":
                clearTerminal()
                insertWelcomeMessage()
                break;
        }

        insertTerminalInput();
    }, 250);
};

function clearTerminal() {
    while (terminalContent.lastChild) {
        terminalContent.removeChild(terminalContent.lastChild);
    };
}

export function main() {
    insertWelcomeMessage()
    insertTerminalInput();
    keyboardListener();
};