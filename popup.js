chrome.cookies.getAll({}, function(cookies) {
    for (var i = 0; i < cookies.length; i++) {
        console.log(`${cookies[i].domain}: ${cookies[i].name} = ${cookies[i].value}`);
    }
});
chrome.storage.sync.get(null, (data) => {
    const cookieList = document.getElementById('cookie-list');

    for (let siteUrl in data) {
        let listItem = document.createElement('li');
        listItem.textContent = `${siteUrl} - Preferences: ${JSON.stringify(data[siteUrl].preferences)}`;
        cookieList.appendChild(listItem);
    }
});
