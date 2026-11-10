import { insertContent, insertTerminalInput, insertWelcomeMessage } from "./script.js";
import { languages } from "./config.js";

export let currentLang = "en";

export function helpCommand() {
    insertContent(`${languages[currentLang].help}`);
    insertTerminalInput("/help");
}

export function aboutCommand() {
    if (window.matchMedia("(max-width: 480px)").matches) {
        insertContent(`${languages[currentLang].mobileAbout}`);
    } else {
        insertContent(`${languages[currentLang].about}`);
    };
    insertTerminalInput("/about");
}

export function projectsCommand() {
    if (window.matchMedia("(max-width: 480px)").matches) {
        insertContent(`${languages[currentLang].mobileProjects}`);
    } else {
        insertContent(`${languages[currentLang].projects}`);
    };
    insertTerminalInput("/projects");
}

export function socialsCommand() {
    insertContent(`${languages[currentLang].socials}`);
    insertTerminalInput("/socials");
};

export function clearCommand() {
    terminalBody.innerHTML = "";
    insertWelcomeMessage();
};

export function languageCommand() {
    currentLang = currentLang === "en" ? "fr" : "en";
    clearCommand();
};

export function cmdNotFound(command) {
    insertContent(`${command} : ${languages[currentLang].cmdNotFound}`);
    insertTerminalInput(``);
};