import _ from 'lodash';
import {
  modifiedNone,
  modifiedAdded,
  modifiedDeleted,
  modifiedChanged,
} from './common.js';

const formatAsStylish = (diff) => {
  const formatValue = (value, padWidth) => {
    if (!_.isObject(value)) {
      return value;
    }
    const result = [];
    const pad = ' '.repeat(padWidth + 2);
    const padEnd = ' '.repeat(padWidth - 2);
    const keys = _.keys(value).sort();
    keys.forEach((key) => {
      result.push(`${pad}${key}: ${formatValue(value[key], padWidth + 4)}`);
    });
    return ['{', ...result, `${padEnd}}`].join('\n');
  };
  const iter = (curDiff, padWidth) => {
    const result = [];
    const pad = ' '.repeat(padWidth);
    const padEnd = ' '.repeat(padWidth - 2);
    curDiff.forEach((d) => {
      switch (d.modified) {
        case modifiedNone:
          result.push(`${pad}  ${d.key}: ${formatValue(d.valueOld, padWidth + 4)}`);
          break;
        case modifiedAdded:
          result.push(`${pad}+ ${d.key}: ${formatValue(d.valueNew, padWidth + 4)}`);
          break;
        case modifiedDeleted:
          result.push(`${pad}- ${d.key}: ${formatValue(d.valueOld, padWidth + 4)}`);
          break;
        case modifiedChanged:
          if (!_.has(d, 'childDiff')) {
            result.push(`${pad}- ${d.key}: ${formatValue(d.valueOld, padWidth + 4)}`);
            result.push(`${pad}+ ${d.key}: ${formatValue(d.valueNew, padWidth + 4)}`);
          } else {
            const childDiff = iter(_.get(d, 'childDiff'), padWidth + 4);
            result.push(`${pad}  ${d.key}: ${childDiff}`);
          }
          break;
        default:
          result.push(`  ? ${d.key}`);
          break;
      }
    });
    return ['{', ...result, `${padEnd}}`].join('\n');
  };
  return iter(diff, 2);
};

const formatters = {
  stylish: formatAsStylish,
};

export default function formatDiff(diff, formatter = 'stylish') {
  return _.get(formatters, _.toLower(formatter))(diff);
}
