Array.prototype.subtract =  function(arr) {
  return this.filter(function(x) { return arr.indexOf(x) < 0 })
};

// The only two public methods are
// addOrChange(record) and remove(record)

window.diffPublisher = {
  globalStore: {
    recordKey(record) {
      return `${record.type}-${record.id}`
    },
    add(record){
      localStorage.setItem(this.recordKey(record),JSON.stringify(record))
    },
    fetch(record) {
      localStorage.getItem(this.recordKey(record))
    },
    remove(record) {
      localStorage.removeItem(this.recordKey(record))
    }
  },
  emit(name, msg) {
    var event = new Event(name, { msg: msg })
    window.dispatchEvent(event)
  },
  addOrChange(record) {
    var change;
    this.checkThatRecordIsValid(record);
    if (!(this.globalStore[record.type])) {
      this.globalStore[record.type] = [];
    }
    prevRecord = this.globalStore.fetch(record);
    if (prevRecord) {
      for(change of this.diff(prevRecord, record)) {
        if (change) { this.emit(change.name, change.msg) }
      }
    } else {
      this.globalStore.add(record)
      this.emit("add", `${record.id} ${record.type}`)
    }
  },
  remove(record) {
    this.checkThatRecordIsValid(record);
    this.globalStore.delete(record)
    this.emit("delete", `${record.type} ${record.id}`);
  },
  diff(record1, record2) {
    var results, record1keys, record2keys, key,
        record1val, record2val, remainingKeys, remainingKey,
        value;
    results = [];
    record1keys = Object.keys(record1);
    record2keys = Object.keys(record2);
    for(key of record1keys) {
      record1val = record1[key];
      record2val = record2[key];
      if (this.isDefined(record2val)) {
        results.push(this.diffAttrs(record1, key, record2val));
      } else {
        results.push(this.deletedAttribute(record1, key));
      }
    }
    remainingKeys = record2keys.subtract(record1keys);
    for(remainingKey of remainingKeys) {
      value = record2[remainingKey];
      results.push(this.addedAttribute(record1, remainingKey, value));
    }
    return results;
  },
  diffAttrs(record, key, newVal) {
    if (record[key] !== newVal) {
      return this.changedAttribute(record, key, newVal);
    } else { return undefined }
  },
  deletedAttribute(record, key) {
    this.globalStore.delete(record)
    return { name: "deleteAttr", msg: `${record.type} ${record.id} ${key}` };
  },
  addedAttribute(record, key, newVal){
    this.globalStore.set(record)
    return { name: "addAttr", msg:`${record.type} ${record.id} ${key}` };
  },
  changedAttribute(record, key, newVal) {
    this.globalStore.set(record)
    return { name: "changeAttr", msg: `${record.type} ${record.id} ${key}` };
  },
  checkThatRecordIsValid(record){
    var attr;
    for (attr of ['id', 'type']) {
      if (!this.isDefined(record[attr])) {
        throw new Error("Records need id and type");
      }
    }
  },
  isDefined(obj) {
    return typeof(obj) !== 'undefined';
  },
};

