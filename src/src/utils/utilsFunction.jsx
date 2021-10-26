/*global chrome*/

export function handleTime(time) {
  if (time === '' || isNaN(time)) {
    alert('valor timeout invalido');
  } else {
    let message = {field: "timeout", setBy: "popup", timeoutValue: time};
    chrome.runtime.sendMessage(message);
  }
}

export function setCaptureOnOff() {
  let allowCapture = document.querySelector("#allow_capture").checked;
  let message = {field: "allowCapture", setBy: "popup", allowCapture: allowCapture};
  chrome.runtime.sendMessage(message);
}

export function toggleDontDisturb() {
  let dontDisturb = document.querySelector("#dont_disturb").checked;

  let message = {field: "dontDisturb", setBy: "popup", toggleDontDisturb: dontDisturb};
  chrome.runtime.sendMessage(message);
}

export function handleDashboard() {
  let message = {field: "dashboard"};
  chrome.runtime.sendMessage(message);
}
