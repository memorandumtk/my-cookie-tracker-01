const headerGenerate = (data) => {
        let domainHeader = document.createElement('th');
        domainHeader.textContent = 'Domain';
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

const rowGenerate = (domain, storedData) => {
    console.log(domain);
    console.log(storedData);
    console.log(storedData[Object.keys(storedData)[0]]);
    let name = Object.keys(storedData)[0];
    let value = storedData[Object.keys(storedData)[0]].value;
    let expirationDate = storedData[Object.keys(storedData)[0]].expirationDate;
        let domainTd = document.createElement('td');
        domainTd.textContent = domain;
        let nameTd = document.createElement('td');
        nameTd.textContent = name;
        let valueTd = document.createElement('td');
        valueTd.textContent = value;
        let expirationTd = document.createElement('td');
        expirationTd.textContent = expirationDate;

        let row = document.createElement('tr');
        row.appendChild(domainTd);
        row.appendChild(nameTd);
        row.appendChild(valueTd);
        row.appendChild(expirationTd);

        return row;
}

const tableGenerate = (data) => {
    let table = document.createElement('table');
    let header = headerGenerate(data);
    table.appendChild(header);
    for (const [domain, storedData] of Object.entries(data)) {
        let row = rowGenerate(domain, storedData);
        table.appendChild(row);
    }
    return table;
}

// Example of one of `cookieData`:
// .gemini.google.com: { "_ga_WC57KJ50ZZ": { "expirationDate": 1747693642.136171, "value": "GS1.1.1713133262.3.1.1713133642.0.0.0" } }

await chrome.storage.local.get("cookieData", (data) => {
    console.log(data);
    const cookieDataDiv = document.getElementById('cookie-data');
    // Remove all children from the div.
    while (cookieDataDiv.firstChild) {
        cookieDataDiv.removeChild(cookieDataDiv.firstChild);
    }

    if (data.cookieData) {
        // Generate a table of the cookie data if `data.cookieData` exists.
        let table = tableGenerate(data.cookieData);
        cookieDataDiv.appendChild(table); 
    } else {
        let message = document.createElement('p');
        message.textContent = 'No cookie preferences recorded yet.';
        siteList.appendChild(message);
    }
});
