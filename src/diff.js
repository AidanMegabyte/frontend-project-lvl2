import _ from 'lodash';
import {
  modifiedNone,
  modifiedAdded,
  modifiedDeleted,
  modifiedChanged,
} from './common.js';

export default function calcDiff(obj1, obj2) {
  const keys = _.sortBy(_.uniq([..._.keys(obj1), ..._.keys(obj2)]));
  return keys.map((key) => {
    const has1 = _.has(obj1, key);
    const value1 = _.get(obj1, key);
    const has2 = _.has(obj2, key);
    const value2 = _.get(obj2, key);
    const diff = { key, valueOld: value1, valueNew: value2 };
    if (has1 && !has2) {
      _.set(diff, 'modified', modifiedDeleted);
    } else if (!has1 && has2) {
      _.set(diff, 'modified', modifiedAdded);
    } else if (_.isEqual(value1, value2)) {
      _.set(diff, 'modified', modifiedNone);
    } else {
      _.set(diff, 'modified', modifiedChanged);
      if (_.isObject(value1) && _.isObject(value2)) {
        _.set(diff, 'childDiff', calcDiff(value1, value2));
      }
    }
    return diff;
  });
}
