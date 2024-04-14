console.log('Background script loaded');

// Storage initialization (if it doesn't exist)
chrome.storage.local.get("cookieData", (data) => {
  if (!data.cookieData) {
    console.log('Initializing cookieData')
    chrome.storage.local.set({ cookieData: {} });
  }
});

// Listener for cookie changes
chrome.cookies.onChanged.addListener((changeInfo) => {
  if (!changeInfo.removed) { 
    console.log(changeInfo.cookie);

    const site = changeInfo.cookie.domain;
    const name = changeInfo.cookie.name;
    const value = changeInfo.cookie.value;
    const expirationDate = changeInfo.cookie.expirationDate;
    const storedData = { value, expirationDate };

    chrome.storage.local.get("cookieData", (data) => {
      let cookieData = data.cookieData || {};

      if (!cookieData[site]) {
        cookieData[site] = {};
      }

      cookieData[site][name] = storedData; 
      chrome.storage.local.set({ cookieData }); 
      console.log('Cookie data updated');
    });
  }
});

// Example of `changeInfo.cookie`:
// {domain: 'developer.chrome.com', expirationDate: 1746824218, hostOnly: true, httpOnly: false, name: 'cookies_accepted', …}
// domain
// :
// "developer.chrome.com"
// expirationDate
// :
// 1746824218
// hostOnly
// :
// true
// httpOnly
// :
// false
// name
// :
// "cookies_accepted"
// path
// :
// "/"
// sameSite
// :
// "unspecified"
// secure
// :
// false
// session
// :
// false
// storeId
// :
// "0"
// value
// :
// "true"