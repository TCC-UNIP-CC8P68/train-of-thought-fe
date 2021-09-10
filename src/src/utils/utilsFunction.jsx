/*global chrome*/

export function handleTime(time) {
  if (time === '' || isNaN(time)) {
    console.log('valor timeout invalido');
  } else {
    let message = ['popup', time];
    chrome.runtime.sendMessage(message);
  }
}
