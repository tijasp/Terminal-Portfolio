import { commandExec } from "./script.js";

export function keyboardListener() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") commandExec();
    });
};