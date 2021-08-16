chrome.tabs.onActivated.addListener(activeInfo => getCurrentTab());

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
      getCurrentTab();
    }
  }
);

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(tab.url);
}