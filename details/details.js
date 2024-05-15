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

// Somewhere in your extension's initialization logic (not inside a listener)
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


// Receiving the message from tableGenerate.js through message passing.
chrome.runtime.onMessage.addListener(
    async function (message, sender, sendResponse) {
        console.log(message)
        if (message.type === 'openDetails') {
            domain = message.data.domain;
            cookieName = message.data.name;
            cookieDetails = message.data.details[cookieName];
            sendResponse({received: "Message received."});

            console.log('Message received:', message); // Check message content
            await detailsGenerate(); // Update the table once
        }
    }
);
