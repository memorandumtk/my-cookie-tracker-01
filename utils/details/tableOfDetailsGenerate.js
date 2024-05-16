import { formatDate } from "../formatDate.js";

/**
 * Generate header row for the table for details.html.
 * @param cookieDetails
 * @returns {HTMLTableRowElement}
 */
function headerGenerate (cookieDetails) {
    let headerRow = document.createElement('tr');
    for (let key of Object.keys(cookieDetails)) {
        let th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    }
    return headerRow;
}

/**
 * Generate a row for the table for details.html.
 * @param cookieDetails
 * @returns {HTMLTableRowElement}
 */
function rowGenerate (cookieDetails) {
    let row = document.createElement('tr');
    for (let value of Object.values(cookieDetails)) {
        let td = document.createElement('td');
        td.textContent = value;
        row.appendChild(td);
    }
    return row;
}

/**
 * Generate table for details.html
 * @param cookieDetails
 * @returns {HTMLTableElement}
 */
function tableOfDetailsGenerate (cookieDetails) {
    let table = document.createElement('table');
    let header = headerGenerate(cookieDetails);
    table.appendChild(header);
    let row = rowGenerate(cookieDetails);
    table.appendChild(row);
    return table;
}

export { tableOfDetailsGenerate };
