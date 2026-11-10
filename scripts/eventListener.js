import { commandExec, focusOnLastInput } from "./script.js";

function keyboardListener() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") commandExec();
    });
};

function clickListener() {
    document.addEventListener("click", () => {
        focusOnLastInput();
    });
};

export function startEventListeners() {
    keyboardListener();
    clickListener();
};