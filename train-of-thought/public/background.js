chrome.tabs.onActivated.addListener(activeInfo => getCurrentTab());

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(tab.url);
}