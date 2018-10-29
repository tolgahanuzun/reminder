var href_url = '';
var valid = false;
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

document.getElementById("remove").onclick = function() {
    text = document.getElementById('reminders-about').value;

    chrome.storage.sync.get([href_url], function() {
        valid = true;
        var url = {};
        url[href_url] = '';
        chrome.storage.sync.set(url);
    });
    window.close();
};

function changeText(url) {
    chrome.storage.sync.get([url], function(result) {
        text = Object.entries(result)[0][1];
        if (text) {
            document.getElementById('reminder-text').innerHTML = text;
            document.getElementById('remove').disabled = false
        }
        else {
            document.getElementById('reminder-text').innerHTML = '';
            document.getElementById('remove').disabled = true
        }
    });
}