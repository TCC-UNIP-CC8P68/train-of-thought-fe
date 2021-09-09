export function handleTime(refTime) {
  let time = refTime.current.value;
  if (time === '' || isNaN(time)) {
    console.log('valor timeout invalido');
  } else {
    let message = ['popup', time];
    console.log(message);
    // chrome.runtime.sendMessage(message);
  }
}
