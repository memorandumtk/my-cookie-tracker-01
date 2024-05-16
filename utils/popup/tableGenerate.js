import { formatDate } from "../formatDate.js";
import { messageSend } from "./messageSend.js";

/**
 * Generate header row for the table.
 * @param data
 * @returns {HTMLTableRowElement}
 */
const headerGenerate = (data) => {
    let domainHeader = document.createElement('th');
    domainHeader.textContent = 'Detail';
    let nameHeader = document.createElement('th');
    nameHeader.textContent = 'Name';
    let valueHeader = document.createElement('th');
    valueHeader.textContent = 'Value';
    let expirationHeader = document.createElement('th');
    expirationHeader.textContent = 'Expiration Date';

    // append all headers to row
    let headerRow = document.createElement('tr');
    headerRow.appendChild(domainHeader);
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(valueHeader);
    headerRow.appendChild(expirationHeader);

    return headerRow;
}

/**
 * Remove the cookie from storage and the table.
 * @param domain
 * @param name
 * @param e
 * @returns {Promise<void>}
 */
const removeCookie = async (domain, name, e) => {
    // Remove the cookie from storage.
    await chrome.storage.local.get("cookieData", (data) => {
        console.log('before');
        console.log(data);
        let cookieData = data.cookieData || {};

        // Remove the cookie from the object: cookieData.
        delete cookieData[domain][name];
        // If the domain object got empty once or from init, remove the domain object.
        if (Object.keys(cookieData[domain]).length === 0) {
            delete cookieData[domain];
        }

        // Then, set the updated cookieData to storage.
        chrome.storage.local.set({ cookieData });
        console.log('after');
        console.log(data);
    });
    // Remove the cookie from the browser too.
    chrome.cookies.remove({ url: `https://${domain}`, name: name });
    // Remove the row from the table.
    e.target.closest('tr').remove();
}

/**
 * Generate a row for the table.
 * @param index
 * @param domain
 * @param storedData
 * @returns {HTMLTableRowElement}
 */
function rowGenerate (index, domain, storedData) {
    let name = Object.keys(storedData)[0];
    let value, expirationDate, formattedExpirationDate;
    if (name) {
        value = storedData[name].value ? storedData[name].value : 'No value.';
        expirationDate = storedData[name].expirationDate || 'No expiration date.';
        formattedExpirationDate = formatDate(expirationDate);
    } else {
        name = 'No name.';
        value = 'No value.';
        expirationDate = 'No expiration date.';
    }

    // domain td
    let domainTd = document.createElement('td');
    let domainAnchor = document.createElement('a');
    domainAnchor.textContent = domain;
    // Remove the leading dot sign if it exists to have access to the site of the domain.
    let modifiedDomain = domain[0] === '.' ? domain.slice(1) : domain; // Remove the leading '.' if it exists.
    domainAnchor.href = `https://${modifiedDomain}`;
    domainAnchor.target = '_blank';
    domainTd.appendChild(domainAnchor);

    // name td
    let nameTd = document.createElement('td');
    nameTd.textContent = name;

    // value td
    let valueTd = document.createElement('td');
    valueTd.textContent = value;
    valueTd.classList.add('value-cell');

    // expiration td
    let expirationTd = document.createElement('td');
    expirationTd.textContent = formattedExpirationDate;

    // remove button td
    let removeButtonTd = document.createElement('td');
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', async (e) => {
        e.stopPropagation(); // Prevent the click event from propagating to the row
        await removeCookie(domain, name, e);
    });
    removeButtonTd.appendChild(removeButton);

    // Append each child elements to `row`.
    let row = document.createElement('tr');
    row.id = `row-${index}`;
    row.appendChild(domainTd);
    row.appendChild(nameTd);
    row.appendChild(valueTd);
    row.appendChild(expirationTd);
    row.appendChild(removeButtonTd);

    // Add event listener to the row.
    row.addEventListener('click', async (e) => {
        console.log('row clicked')
        let detailsToBeSent = {domain: domain, name: name, details: storedData, event: e};
        await messageSend(detailsToBeSent)
    });

    return row;
}

/**
 * Generate a table for the popup.
 * @param data
 * @returns {HTMLTableElement}
 */
function tableGenerate (data) {
    let table = document.createElement('table');
    let header = headerGenerate(data);
    table.appendChild(header);
    // Generate rows for each domain. `data` is an object: `data.cookieData`
    // which is with domain as key and storedData as value.
    for (const [index, [domain, storedData]] of Object.entries(data).entries()) {
        let row = rowGenerate(index, domain, storedData);
        table.appendChild(row);
    }
    return table;
}

export { tableGenerate };