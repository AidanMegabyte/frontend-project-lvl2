import _ from 'lodash';
import {
  modifiedNone,
  modifiedAdded,
  modifiedDeleted,
  modifiedChanged,
} from '../common.js';

const formatValue = (value) => {
  if (!_.isObject(value)) {
    const quote = _.isString(value) ? '\'' : '';
    return `${quote}${value}${quote}`;
  }
  return '[complex value]';
};

const formatValueChange = (fullPropName, modified, valueOld, valueNew) => {
  if (modified === modifiedNone) {
    return `Property '${fullPropName}' was not changed`;
  }
  if (modified === modifiedDeleted) {
    return `Property '${fullPropName}' was removed`;
  }
  if (modified === modifiedAdded) {
    return `Property '${fullPropName}' was added with value: ${formatValue(valueNew)}`;
  }
  if (modified === modifiedChanged) {
    return `Property '${fullPropName}' was updated. From ${formatValue(valueOld)} to ${formatValue(valueNew)}`;
  }
  return `Property '${fullPropName}' has unknown state`;
};

const formatDiffItem = (diffItem, parentProps = []) => {
  const result = [];
  const { modified } = diffItem;
  if (modified !== modifiedNone) {
    const {
      key, valueOld, valueNew,
    } = diffItem;
    const fullPropName = [...parentProps, key].join('.');
    if (!_.has(diffItem, 'childDiff')) {
      const valueChange = formatValueChange(fullPropName, modified, valueOld, valueNew);
      result.push(valueChange);
    } else {
      const childDiff = _.get(diffItem, 'childDiff');
      const nestedParentProps = [...parentProps, key];
      childDiff.forEach((childDiffItem) => {
        const childResult = formatDiffItem(childDiffItem, nestedParentProps);
        result.push(...childResult);
      });
    }
  }
  return result;
};

export default function formatAsPlain(diff) {
  const result = [];
  diff.forEach((diffItem) => result.push(...formatDiffItem(diffItem)));
  return result.join('\n');
}
