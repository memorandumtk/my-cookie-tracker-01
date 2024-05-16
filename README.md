# Cookie Manager
This is a chrome extension to manage cookie data of yours. When this chrome is enabled, the domain, the name and other information of the site that you added to your cookie.

## How it works
- After it is enabled, the `background.js` listens to the cookie change event using chrome cookie API.
- When the cookie change event is triggered, the cookie data is stored in the `chrome.storage.local` as `cookieData`. Each data will be stored as `storedData` into `cookieData`.
- The `popup.js` will get the `cookieData` from the `chrome.storage.local` and display the data in the `popup.html` using table.
- The `popup.html` will display the cookie data in the table with domain, name, expiration date and `Remove` button. If `Remove` button is clicked, the cookie data will be removed from the `chrome.storage.local` and the table will be updated with removing the row.
- If you click the table row, you can see the detail of the cookie data in the `popup.html`. It is done by the logic below.
    1. When the table row is clicked, the `cookieData` is retrieved from the `chrome.storage.local`.
    2. The `cookieData` is picked up by the domain and the name of the cookie data.
    3. The picked data is passed to the `backgrouond.js` using `chrome.runtime.sendMessage`
    4. the `background.js` will store the detail of the cookie data to the `chrome.runtime.storage` with key: `details`. If it's stored successfully, the `backgound.js` will open the `details.html` as optionsPage.
    5. The `details.html` will be open and display the detail of the cookie data.
   > The reason to pass though `background.js` once is two reasons. One is that it is not possible to pass the data directly from `popup.js` to `details.html`. The other is that the `background.js` can store the data sent from `popup.html` so that I can ensure that the cookie data selected can be used in `details.html`.

---

## How to use
1. Import and enable the extension.
2. Cookie data after the extension is enabled, it will automatically be recorded through chrome cookie API.
3. Clicking the icon, you can see the cookie information you have in `popup.html`.
4. In the `popup.html`, a table will be displayed with each of the cookie data like domain, name and expiration date and `Remove` button, which will delete the cookie data.
5. If you would like to see detail of a cookie data, you can see it clicking the table row of the cookie.


---

### Example of cookie data object
background.js Line 22, storedData example.
```text
{
    "domain": ".google.com",
    "expirationDate": 1747262997.74793,
    "hostOnly": false,
    "httpOnly": false,
    "name": "SIDCC",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "AKEyXzWttUc7n5cyktxQIDpxvn1wwirId2_f-tii5JL_5mFpMQFqpOsRlA9yrrO9sZJ2E1Z5l0A"
}
```