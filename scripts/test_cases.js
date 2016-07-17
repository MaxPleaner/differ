// sample object
function createSampleObject() {
  return { id: 1, type: "foo", foo: "bar"};
}

function createAndCheckForAdd(sampleObject) {
  expectEmittedEvent(
    "When publishing a record, an 'add' event is fired",
    "add",
    JSON.stringify(sampleObject)
  );
  DiffPublisher.addOrChange(sampleObject);
}

function changeAttributeAndCheckForChangeAttr(sampleObject) {
  expectEmittedEvent(
    "When changing a records attribute, a 'changeAttr' event is fired",
    'changeAttr',
    JSON.stringify({
      type: sampleObject.type,
      id: sampleObject.id,
      key: "foo",
      val: "baz"
    })
  );
  DiffPublisher.addOrChange({
    id: sampleObject.id,
    type: sampleObject.type,
    foo: "baz"
  });
}

TestCases = {
  run: function() {
    clearLocalStorage();
    var sampleObject = createSampleObject();
    createAndCheckForAdd(sampleObject);
    changeAttributeAndCheckForChangeAttr(sampleObject);
  }
}