export async function messageSend(data) {

    const response = await chrome.runtime.sendMessage({
        type: 'openDetails',
        data: data
    })
        .catch(error => {
            console.log(error);
        });
    // do something with response here, not outside the function
    console.log(response);
    console.log('Message sent');

}