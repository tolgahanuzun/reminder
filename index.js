var href_url = '';
$("#reminders").ready(function(){
    url = document.getElementById('reminders-url');
    
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        try {
            url.innerHTML = tabs[0].url;
            href_url = tabs[0].url;
        }
        catch(err) {
            console.log(err);
        }
    });
});

$("#save").click(function(){
    console.log(href_url);

    var all_url = {}
    chrome.storage.sync.get(['url'], function(result) {
        all_url = result.keys;
    });

    text = document.getElementById('reminders-about');

    save_url = {
        url : href_url,
        text : text
    }

    console.log(save_url)
    console.log(all_url)
    // Iki dizinin farkını almak gerekiyor. Ve storage setlenmesi gerekiyor.

    chrome.storage.sync.set({ url : '1'}, function() {
        console.log('Value is set to ' + '1');
      });

});