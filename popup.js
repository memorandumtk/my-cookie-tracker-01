await chrome.storage.local.get("cookieData", (data) => {
    console.log(data);
    const siteList = document.getElementById('site-list');
    siteList.innerHTML = ''; // Clear existing list

    if (data.cookieData) {
        for (const [site, preference] of Object.entries(data.cookieData)) {
            let listItem = document.createElement('li');
            listItem.textContent = `${site}: ${preference}`;
            siteList.appendChild(listItem);
        }
    } else {
        let message = document.createElement('p');
        message.textContent = 'No cookie preferences recorded yet.';
        siteList.appendChild(message);
    }
});
