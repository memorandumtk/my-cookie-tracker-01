import { tableGenerate } from "./utils/tableGenerate.js";

await chrome.storage.local.get("cookieData", (data) => {
    console.log(data);
    const cookieDataDiv = document.getElementById('cookie-data');
    // Remove all children from the div.
    // while (cookieDataDiv.firstChild) {
    //     cookieDataDiv.removeChild(cookieDataDiv.firstChild);
    // }

    if (data.cookieData) {
        // Generate a table of the cookie data if `data.cookieData` exists.
        let table = tableGenerate(data.cookieData);
        cookieDataDiv.appendChild(table);
    } else {
        let message = document.createElement('p');
        message.textContent = 'No cookie preferences recorded yet.';
        cookieDataDiv.appendChild(message);
    }
});
