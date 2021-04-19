import _ from 'lodash';

const modifiedNone = 0;
const modifiedAdded = 1;
const modifiedDeleted = 2;
const modifiedChanged = 3;

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

const formatDiff = (diff, formatAs = 'stylish') => _.get(formatters, formatAs)(diff);

export {
  modifiedNone,
  modifiedAdded,
  modifiedDeleted,
  modifiedChanged,
  formatDiff,
};
