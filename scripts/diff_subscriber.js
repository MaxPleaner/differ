window.addEventListener('add', function(e) {
  var record = e.detail;
  Subscriptions.onAdd(record)
}, false);

window.addEventListener('delete', function(e){
  var record = e.detail;
  Subscriptions.onDelete(record)
}, false);

window.addEventListener('addAttr', function(e){
  var record = e.detail
  Subscriptions.onAddAttr(record)
}, false);

window.addEventListener('deleteAttr', function(e){
  var record = e.detail;
  Subscriptions.onDeleteAttr(record)
}, false);

window.addEventListener('changeAttr', function(e){
  var record = e.detail;
  Subscriptions.onChangeAttr(record)
}, false);

