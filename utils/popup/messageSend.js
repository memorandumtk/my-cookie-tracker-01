export async function messageSend(data) {
    chrome.runtime.sendMessage({
        action: 'openOptionsPage',
        details: data
    }, function (response) {
        if (chrome.runtime.lastError) {
            console.error('Error:', chrome.runtime.lastError);
        } else {
            console.log('Response from background:', response);
            // Close the popup window
            window.close();
        }
    });

}