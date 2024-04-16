import { formatDate } from "./formatDate.js";

const headerGenerate = (data) => {
    let domainHeader = document.createElement('th');
    domainHeader.textContent = 'Detail';
    let nameHeader = document.createElement('th');
    nameHeader.textContent = 'Name';
    let valueHeader = document.createElement('th');
    valueHeader.textContent = 'Value';
    let expirationHeader = document.createElement('th');
    expirationHeader.textContent = 'Expiration Date';

    let headerRow = document.createElement('tr');
    headerRow.appendChild(domainHeader);
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(valueHeader);
    headerRow.appendChild(expirationHeader);

    return headerRow;
}

const removeCookie = async (domain, name, e) => {
    // Remove the cookie from storage.
    await chrome.storage.local.get("cookieData", (data) => {
        console.log('before');
        console.log(data);
        let cookieData = data.cookieData || {};
        delete cookieData[domain][name];
        if (Object.keys(cookieData[domain]).length === 0) {
            delete cookieData[domain];
        }
        chrome.storage.local.set({ cookieData });
        console.log('after');
        console.log(data);
    });
    chrome.cookies.remove({ url: `https://${domain}`, name: name });
    // Remove the row from the table.
    e.target.closest('tr').remove();
}

const rowGenerate = (index, domain, storedData) => {
    console.log(domain);
    console.log(storedData);
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
    let domainTd = document.createElement('td');
    let domainAnchor = document.createElement('a');
    domainAnchor.textContent = domain;
    domainAnchor.href = `./details.html?domain=${domain}`;
    // domainAnchor.textContent = domain[0] === '.' ? domain.slice(1) : domain; // Remove the leading '.' if it exists.
    // domainAnchor.href = `https://${domainAnchor.textContent}`;
    domainTd.appendChild(domainAnchor);
    let nameTd = document.createElement('td');
    nameTd.textContent = name;
    let valueTd = document.createElement('td');
    valueTd.textContent = value;
    valueTd.classList.add('value-cell');
    let expirationTd = document.createElement('td');
    expirationTd.textContent = formattedExpirationDate;
    let removeButtonTd = document.createElement('td');
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', (e) => {
        removeCookie(domain, name, e);
    });
    removeButtonTd.appendChild(removeButton);

    let row = document.createElement('tr');
    row.appendChild(domainTd);
    row.appendChild(nameTd);
    row.appendChild(valueTd);
    row.appendChild(expirationTd);
    row.appendChild(removeButtonTd);

    return row;
}

const tableGenerate = (data) => {
    let table = document.createElement('table');
    let header = headerGenerate(data);
    table.appendChild(header);
    for (const [index, [domain, storedData]] of Object.entries(data).entries()) {
        let row = rowGenerate(index, domain, storedData);
        table.appendChild(row);
    }
    return table;
}

// Example of one of `cookieData`:
// .gemini.google.com: { "_ga_WC57KJ50ZZ": { "expirationDate": 1747693642.136171, "value": "GS1.1.1713133262.3.1.1713133642.0.0.0" } }

export { tableGenerate };