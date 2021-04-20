import _ from 'lodash';
import {
  modifiedNone,
  modifiedAdded,
  modifiedDeleted,
  modifiedChanged,
} from './common.js';

const formatAsStylish = (diff) => {
  const result = [];
  diff.forEach((d) => {
    switch (d.modified) {
      case modifiedNone:
        result.push(`    ${d.key}: ${d.valueOld}`);
        break;
      case modifiedAdded:
        result.push(`  + ${d.key}: ${d.valueNew}`);
        break;
      case modifiedDeleted:
        result.push(`  - ${d.key}: ${d.valueOld}`);
        break;
      case modifiedChanged:
        result.push(`  - ${d.key}: ${d.valueOld}`);
        result.push(`  + ${d.key}: ${d.valueNew}`);
        break;
      default:
        result.push(`  ? ${d.key}`);
        break;
    }
  });
  return ['{', ...result, '}'].join('\n');
};

const formatters = {
  stylish: formatAsStylish,
};

export default function formatDiff(diff, formatAs = 'stylish') {
  return _.get(formatters, formatAs)(diff);
}
