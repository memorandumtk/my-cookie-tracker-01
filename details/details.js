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

const detailsDiv = document.getElementById('details-div');

// const openDetails = (domain, name, e) => {
//     console.log('details is opened. ' + domain + '. ' + name);
//     chrome.runtime.openOptionsPage();
//     detailsDiv.textContent = 'test';

// };
await chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'openDetails') {
        console.log('details is opened. ' + message.data.domain + '. ' + message.data.name);
    }
});

// export { openDetails };
