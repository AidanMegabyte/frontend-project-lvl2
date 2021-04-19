import _ from 'lodash';
import parseFile from './parsers.js';
import {
  modifiedNone,
  modifiedAdded,
  modifiedDeleted,
  modifiedChanged,
  formatDiff,
} from './formatters.js';

const calcDiff = (obj1, obj2) => {
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
    } else if (value1 === value2) {
      diff.modified = modifiedNone;
    } else {
      diff.modified = modifiedChanged;
    }
    result.push(diff);
  });
  return result;
};

export default function genDiff(filepath1, filepath2, formatAs = 'stylish') {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const diff = calcDiff(obj1, obj2);
  return formatDiff(diff, formatAs);
}
