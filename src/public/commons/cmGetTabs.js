async function getTabs(queryOptions) {
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs;
}