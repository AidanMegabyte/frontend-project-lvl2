import { stylishFormatName } from './common.js';
import parseFile from './parsers.js';
import calcDiff from './diff.js';
import getFormatter from './formatters/index.js';

export default function genDiff(filepath1, filepath2, format = stylishFormatName) {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const diff = calcDiff(obj1, obj2);
  const formatDiff = getFormatter(format);
  return formatDiff(diff);
}
