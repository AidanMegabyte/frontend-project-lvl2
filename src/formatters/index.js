import _ from 'lodash';
import { stylishFormatName, plainFormatName, jsonFormatName } from '../common.js';
import formatAsStylish from './stylish.js';
import formatAsPlain from './plain.js';
import formatAsJson from './json.js';

const formatters = {
  [stylishFormatName]: formatAsStylish,
  [plainFormatName]: formatAsPlain,
  [jsonFormatName]: formatAsJson,
};

export default function getFormatter(format = stylishFormatName) {
  return _.get(formatters, _.toLower(format));
}
