var href_url = '';
document.body.onload = function() {
    url = document.getElementById('reminders-url');
    
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        try {
            url.innerHTML = tabs[0].url;
            href_url = tabs[0].url;
            changeText(tabs[0].url)
        }
        catch(err) {
            console.log(err);
        }
    });

}

document.getElementById("save").onclick = function() {
    text = document.getElementById('reminders-about').value;
    var url = {};
    url[href_url] = text;
    chrome.storage.sync.set(url);
    text = changeText(href_url)
};

function changeText(url) {
    chrome.storage.sync.get([url], function(result) {
        text = Object.entries(result)[0][1];
        if (text) {
            document.getElementById('reminder-text').innerHTML = text;
        }
    });
}