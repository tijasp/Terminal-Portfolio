import { insertChar } from "./dom.js"

export function keyboardListener() {
    document.addEventListener("keydown", (e) => {
        const re = new RegExp("[a-zA-Z]");

        if (re.test(e.key) && e.key.length === 1 || e.key === "Backspace" || e.key === " ") {
            insertChar(e.key);
        } else if (e.key === "Enter") {
            console.log("Enter");
        };
    });
};