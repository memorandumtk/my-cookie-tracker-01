// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {tableOfDetailsGenerate} from "../utils/details/tableOfDetailsGenerate.js";

const detailsDiv = document.getElementById('details-div');
const domainNameElement = document.getElementById('domain-name');

let domain;
let modifiedDomain;
let cookieName;
let cookieDetails;
let table;

async function initializeDetailsArea() {
    if (cookieDetails) {
        table = await tableOfDetailsGenerate(cookieDetails);
        detailsDiv.appendChild(table);
    }
}

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

const detailsGenerate = async () => {
    // Append the table to the div.
    console.log(cookieDetails);

    // Clear existing table content (except header)
    !table ? await initializeDetailsArea() : updateTable();

    // Set the domain name.
    modifiedDomain = domain[0] === '.' ? domain.slice(1) : domain;
    domainNameElement.textContent = modifiedDomain;
}

// Event listener for DOMContentLoaded. When this details page is loaded, this tries to retrieve data in storage 'details'.
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