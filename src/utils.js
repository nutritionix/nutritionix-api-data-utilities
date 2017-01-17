'use strict';

module.exports = {
  defaults
};

function defaults(source, ...rest) {
  for (let i = 0; i < rest.length; i++) {
    Object.keys(rest[i]).forEach(key => {
      if(source[key] === undefined) {
        source[key] = rest[key];
      }
    });
  }
  return source;
}
