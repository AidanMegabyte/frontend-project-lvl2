import _ from 'lodash';
import {
  modifiedNone,
  modifiedAdded,
  modifiedDeleted,
  modifiedChanged,
} from './common.js';

const modifiedChars = {
  [modifiedNone]: ' ',
  [modifiedAdded]: '+',
  [modifiedDeleted]: '-',
};

const modifiedSimple = [
  modifiedNone,
  modifiedAdded,
  modifiedDeleted,
];

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

const formatValueChange = (pad, char, key, value) => `${pad}${char} ${key}: ${value}`;

const formatDiffItem = (diffItem, padWidth, formatNestedDiff) => {
  const pad = ' '.repeat(padWidth);
  const {
    key, modified, valueOld, valueNew,
  } = diffItem;
  if (modifiedSimple.includes(modified)) {
    const modifiedChar = modifiedChars[modified];
    const value = modified === modifiedAdded ? valueNew : valueOld;
    const formattedValue = formatValue(value, padWidth + 4);
    return formatValueChange(pad, modifiedChar, key, formattedValue);
  }
  if (modified === modifiedChanged) {
    if (!_.has(diffItem, 'childDiff')) {
      const { [modifiedAdded]: addedChar, [modifiedDeleted]: deletedChar } = modifiedChars;
      const formattedValueOld = formatValue(valueOld, padWidth + 4);
      const keyValueOld = formatValueChange(pad, deletedChar, key, formattedValueOld);
      const formattedValueNew = formatValue(valueNew, padWidth + 4);
      const keyValueNew = formatValueChange(pad, addedChar, key, formattedValueNew);
      return `${keyValueOld}\n${keyValueNew}`;
    }
    const nestedDiff = formatNestedDiff(_.get(diffItem, 'childDiff'), padWidth + 4);
    return formatValueChange(pad, modifiedChars[modifiedNone], key, nestedDiff);
  }
  return formatValueChange(pad, '?', key, 'unknown \'modified\' type');
};

const formatAsStylish = (diff) => {
  const iter = (curDiff, padWidth) => {
    const result = [];
    const padEnd = ' '.repeat(padWidth - 2);
    curDiff.forEach((d) => result.push(formatDiffItem(d, padWidth, iter)));
    return ['{', ...result, `${padEnd}}`].join('\n');
  };
  return iter(diff, 2);
};

const formatters = {
  stylish: formatAsStylish,
};

export default function formatDiff(diff, format = 'stylish') {
  return _.get(formatters, _.toLower(format))(diff);
}
