console.log('Background script loaded');

// Storage initialization (if it doesn't exist)
chrome.storage.local.get("cookieData", (data) => {
    console.log(data);
    if (!data) {
        console.log('Initializing cookieData')
        chrome.storage.local.set({cookieData: {}});
    }
});

// Listener for opening the options page to pass the message from popup to details.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received in background.js:', message);
    if (message.action === 'openOptionsPage') {
        chrome.storage.local.set({ details: message.details }, function() {
            console.log('Details stored in background.js:', message.details);
            chrome.runtime.openOptionsPage();
            sendResponse({ status: 'Options page opened and details stored' });
        });
        return true; // Indicate that we will send a response asynchronously
    }
});

// Listener for cookie changes
// chrome.cookies.onChanged.addListener((changeInfo) => {
//
//   if (!changeInfo.removed) {
//
//     const domain = changeInfo.cookie.domain;
//     const name = changeInfo.cookie.name;
//     // const value = changeInfo.cookie.value;
//     // const expirationDate = changeInfo.cookie.expirationDate;
//     // const storedData = { value, expirationDate };
//     const storedData = changeInfo.cookie;
//
//     chrome.storage.local.get("cookieData", (data) => {
//       let cookieData = data.cookieData || {};
//
//       if (!cookieData[domain]) {
//         cookieData[domain] = {};
//       }
//
//       cookieData[domain][name] = storedData;
//       console.log(storedData)
//
//       chrome.storage.local.set({ cookieData });
//     });
//   }
// });