chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') { // Website fully loaded
        chrome.cookies.getAll({ url: tab.url }, (cookies) => {
            // Process Cookies
            let siteData = {
                url: tab.url,
                preferences: cookies
            };
            console.log(siteData);
            chrome.storage.sync.set({ [tab.url]: siteData }, () => {
                console.log("Cookie Preferences stored for", tab.url);
            });
        });
    }
});
