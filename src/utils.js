'use strict';

module.exports = {
  defaults,
  mapKeys,
  reduce,
  uniqBy,
  keys,
  pickBy,
  get,
  forEach,
  find,
  isUndefined
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

function pickBy(obj, predicate) {
  predicate = predicate || (x => x);
  let result = {};
  for (let key of keys(obj)) {
    let shouldPick = predicate(obj[key], key);
    if (shouldPick) result[key] = obj[key];
  }
  return result;
}

function isUndefined(value) {
  return value === undefined;
}

function get(object, key) {
  let current = object;

  const keys = key.split('.');

  for (let i = 0; i < keys.length; i += 1) {
    if (current === null || typeof current !== 'object') {
      current = undefined;
      break;
    }

    current = current[keys[i]];
  }

  return current;
}

function find(collection, predicate) {
  if (typeof collection === 'object') {
    if (!collection.length) {
      collection = Object.values(collection);
    }

    for (let i = 0; i < collection.length; i += 1) {
      if (predicate(collection[i])) {
        return collection[i];
      }
    }
  }

  return undefined;
}

function forEach(collection, iterator) {
  Object.keys(collection).forEach((key) => {
    iterator(collection[key], key);
  });
}
