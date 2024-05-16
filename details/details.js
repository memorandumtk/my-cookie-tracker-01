import {tableOfDetailsGenerate} from "../utils/details/tableOfDetailsGenerate.js";

const detailsDiv = document.getElementById('details-div');
const domainNameElement = document.getElementById('domain-name');

let domain;
let modifiedDomain;
let cookieName;
let cookieDetails;
let table;

/**
 * Initialize the details area with the table of details.
 * @returns {Promise<void>}
 */
async function initializeDetailsArea() {
    if (cookieDetails) {
        table = await tableOfDetailsGenerate(cookieDetails);
        detailsDiv.appendChild(table);
    }
}

/**
 * Update the table content.
 */
function updateTable() {
    // Clear existing table content.
    console.log(table);
    if (detailsDiv.contains(table)) {
        detailsDiv.removeChild(table);
    }

    // Call your initialization function
    initializeDetailsArea()
        .then(r => {
            console.log('Table updated and initialized.');
        });
}

/**
 * Trigger to generate the details table for details.html.
 * @returns {Promise<void>}
 */
async function detailsGenerate () {
    // Append the table to the div.
    console.log(cookieDetails);

    // Clear existing table content (except header)
    !table ? await initializeDetailsArea() : updateTable();

    // Set the domain name.
    modifiedDomain = domain[0] === '.' ? domain.slice(1) : domain;
    domainNameElement.textContent = modifiedDomain;
}

/**
 * Event listener for DOMContentLoaded.
 * When this details page is loaded, this tries to retrieve data in chrome.runtime.storage 'details',
 * which is data stored by a function in background.js when it received message API..
 */
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed')
    chrome.storage.local.get('details', async function (data) {
        console.log('Inside chrome.storage.local.get callback');
        if (chrome.runtime.lastError) {
            console.error('Error retrieving details:', chrome.runtime.lastError);
        }
        if (data && data.details) {
            console.log('Details received:', data.details);
            domain = data.details.domain;
            cookieName = data.details.name;
            cookieDetails = data.details.details[cookieName];

            console.log('Domain:', domain);
            console.log('Cookie Name:', cookieName);
            console.log('Cookie Details:', cookieDetails);

            await detailsGenerate(); // Update the table once

            chrome.storage.local.remove('details', () => {
                console.log('Details removed from storage');
            }); // Clean up storage if necessary
        } else {
            console.log('No details found in storage');
        }
    });
});