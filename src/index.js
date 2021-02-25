import _ from 'lodash';

export default function genDiff(json1, json2) {
  const result = [];
  const keys = _.uniq([..._.keys(json1), ..._.keys(json2)]).sort();
  keys.forEach((key) => {
    const has1 = _.has(json1, key);
    const value1 = _.get(json1, key);
    const has2 = _.has(json2, key);
    const value2 = _.get(json2, key);
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
