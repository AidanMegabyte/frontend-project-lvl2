import _ from 'lodash';
import { stylishFormatName } from '../common.js';
import formatAsStylish from './stylish.js';

const formatters = {
  [stylishFormatName]: formatAsStylish,
};

export default function getFormatter(format = stylishFormatName) {
  return _.get(formatters, _.toLower(format));
}
