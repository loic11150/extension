console = chrome.extension.getBackgroundPage().console
// initialize
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "ogmcikbkemoejnohmdcljkbphemepfgd",
      "title": "Smart Saver",
      "url": 'demo/index.html'
    });
});