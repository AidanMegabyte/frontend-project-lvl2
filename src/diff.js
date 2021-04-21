import _ from 'lodash';
import {
  modifiedNone,
  modifiedAdded,
  modifiedDeleted,
  modifiedChanged,
} from './common.js';

export default function calcDiff(obj1, obj2) {
  const result = [];
  const keys = _.uniq([..._.keys(obj1), ..._.keys(obj2)]).sort();
  keys.forEach((key) => {
    const has1 = _.has(obj1, key);
    const value1 = _.get(obj1, key);
    const has2 = _.has(obj2, key);
    const value2 = _.get(obj2, key);
    const diff = { key, valueOld: value1, valueNew: value2 };
    if (has1 && !has2) {
      diff.modified = modifiedDeleted;
    } else if (!has1 && has2) {
      diff.modified = modifiedAdded;
    } else if (_.isEqual(value1, value2)) {
      diff.modified = modifiedNone;
    } else {
      diff.modified = modifiedChanged;
      if (_.isObject(value1) && _.isObject(value2)) {
        diff.childDiff = calcDiff(value1, value2);
      }
    }
    result.push(diff);
  });
  return result;
}
