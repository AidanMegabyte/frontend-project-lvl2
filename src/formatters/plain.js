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
  const { modified } = diffItem;
  if (modified === modifiedNone) {
    return null;
  }
  const {
    key, valueOld, valueNew,
  } = diffItem;
  const fullPropName = [...parentProps, key].join('.');
  if (!_.has(diffItem, 'childDiff')) {
    const valueChange = formatValueChange(fullPropName, modified, valueOld, valueNew);
    return valueChange;
  }
  const childDiff = _.get(diffItem, 'childDiff');
  const nestedParentProps = [...parentProps, key];
  const result = childDiff.map((childDiffItem) => formatDiffItem(childDiffItem, nestedParentProps));
  return _.flattenDeep(result);
};

export default function formatAsPlain(diff) {
  const result = diff.map((diffItem) => formatDiffItem(diffItem));
  return _.filter(_.flattenDeep(result), (o) => o).join('\n');
}
