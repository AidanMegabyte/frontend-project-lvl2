import _ from 'lodash';
import { stylishFormatName, plainFormatName } from '../common.js';
import formatAsStylish from './stylish.js';
import formatAsPlain from './plain.js';

const formatters = {
  [stylishFormatName]: formatAsStylish,
  [plainFormatName]: formatAsPlain,
};

export default function getFormatter(format = stylishFormatName) {
  return _.get(formatters, _.toLower(format));
}
