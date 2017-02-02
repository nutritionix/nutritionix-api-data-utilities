'use strict';

module.exports = {
  defaults,
  mapKeys,
  reduce,
  uniqBy,
  keys
};

function defaults(source, ...rest) {
  for (let i = 0; i < rest.length; i++) {
    Object.keys(rest[i]).forEach(key => {
      if(source[key] === undefined) {
        source[key] = rest[i][key];
      }
    });
  }
  return source;
}

function mapKeys(obj, fnc) {
  var returnObj = {};
  Object.keys(obj).forEach(key => {
    let newKey = fnc(obj[key], key, obj);
    returnObj[newKey] = obj[key];
  });
  return returnObj;
}

function reduce(collection, fn, accum) {
  var isArr = Array.isArray(collection);
  var hasAccumulator = arguments.length>=3;
  var result = accum;

  // bind new iterator fn to collection & accum
  function iterator(item, idxOrKey) {
    if (!hasAccumulator) {
      result = item;
      hasAccumulator = true;
    }
    else {
      result = fn(result, item, idxOrKey, collection);
    }
  }

  if (isArr) {
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i);
    }
  } else {
    let keys = Object.keys(collection);
    for (var i = 0; i < keys.length; i++) {
      let val = collection[keys[i]];
      iterator(val, keys[i]);
    }
  }
  return result;
}

function uniqBy(array, comparator) {
  let uniqKeys = {};
  let result = [];

  array.forEach(item => {
    let keyTest = comparator(item);
    if (!uniqKeys[keyTest]) {
      uniqKeys[keyTest] = true;
      result.push(item);
    }
  });

  return result;
}

function keys(obj) {
  let ownKeys = [];
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) ownKeys.push(prop);
  }
  return ownKeys;
}
