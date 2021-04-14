import _ from 'lodash';
import parseFile from './parsers.js';

export default function genDiff(filepath1, filepath2) {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const result = [];
  const keys = _.uniq([..._.keys(obj1), ..._.keys(obj2)]).sort();
  keys.forEach((key) => {
    const has1 = _.has(obj1, key);
    const value1 = _.get(obj1, key);
    const has2 = _.has(obj2, key);
    const value2 = _.get(obj2, key);
    if (has1 && !has2) {
      result.push(`  - ${key}: ${value1}`);
    } else if (!has1 && has2) {
      result.push(`  + ${key}: ${value2}`);
    } else if (value1 === value2) {
      result.push(`    ${key}: ${value2}`);
    } else {
      result.push(`  - ${key}: ${value1}`);
      result.push(`  + ${key}: ${value2}`);
    }
  });
  return ['{', ...result, '}'].join('\n');
}
