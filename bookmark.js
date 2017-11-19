"use strict";

function onError(error) {
  console.error(`Error: ${error}`);
}

browser.commands.onCommand.addListener((command) => {
  var index = command.split("-")[2] - 1;

  // Look it up every time instead of on loading the extension,
  // so that it's sensitive to the user changing the toolbar.
  var gettingBMs = browser.bookmarks.getChildren("toolbar_____");
  gettingBMs.then((bookmarks) => {
    if (index >= bookmarks.length)
      return;

    let url = bookmarks[index].url;
    // updates active tab
    browser.tabs.update({url: url});
  }, onError);
});
