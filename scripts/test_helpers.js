function clearLocalStorage() {
  for(var key of Object.keys(localStorage)) {
    delete localStorage[key];
  }
}

function initConsole() {
  Console.attach();
  Console.styles.attach();
  Console.styles.register({
    red: 'color:#de4f2a',
    green: 'color:green',
  });
}
initConsole()

function captureMessagesInLog(){
  window.oldLog = console.log;
  window.log = [];
  console.log = (msg) => { log.push(msg); }
}
captureMessagesInLog();

function compareResults(title, trueMsg, expectMsg) {
  if (trueMsg == expectMsg) {
    successMsg = `${title} passed.`.green + `\nEmitted ${trueMsg}\n\n`;
    oldLog(successMsg);
  } else {
    failMsg = `${title} failed.`.red + `\nEmitted ${trueMsg}\nExpected ${expectMsg}\n\n`;
    oldLog(failMsg);
  }
}

function expectLoggedMessage(title, expectMsg) {
  var trueMsg = log.shift();
  compareResults(title, trueMsg, expectMsg);
}

window.eventListeners = [];

function expectEmittedEvent(title, eventName, expectMsg) {
  document.removeEventListener(eventName, true);
  document.addEventListener(eventName, function(event) {
    var trueMsg = event.detail;
    compareResults(title, trueMsg, expectMsg);
  });
  eventListeners.push(eventName);
}

function stopEventListeners() {
  for (var listenerName of eventListeners) {
    document.removeEventListener(listenerName, true);
  }
}