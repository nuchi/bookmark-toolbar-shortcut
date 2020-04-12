"use strict";

browser.commands.onCommand.addListener((command) => {
  let currentTabPromise = browser.windows.getCurrent().then((w) => {
    return browser.tabs.query({'active': true, 'windowId': w.id});
  });

  let bookmarkUrlPromise = browser.bookmarks.getChildren("toolbar_____").then((bookmarks) => {
    let bookmarkIdx = command.split("-")[2] - 1;
    if (bookmarkIdx >= bookmarks.length) {
      return null;
    }
    let url = bookmarks[bookmarkIdx].url;
    return url;
  });

  Promise.all([currentTabPromise, bookmarkUrlPromise]).then(([[tab], url]) => {
    if (url == null) {
      return;
    }
    browser.tabs.update(tab.id, {'url': url});
  }).catch((error) => {
    console.error(`Error: ${error}`);
  });
});