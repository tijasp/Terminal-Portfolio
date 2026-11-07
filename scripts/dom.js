export function insertChar(key) {
    const lastLine = document.querySelector("#terminalContent > div:nth-last-child(1)");
    const username = lastLine.querySelector(".terminalUsername");
    const spaceLeft = lastLine.clientWidth - username.offsetWidth - 8;
    let typezone = lastLine.querySelector("p");

    if (!typezone) {
        const newTypezone = document.createElement("p");
        newTypezone.classList.add("terminalText");
        lastLine.append(newTypezone);
        typezone = lastLine.querySelector("p");
    };

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