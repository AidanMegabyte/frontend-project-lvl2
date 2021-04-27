import parseFile from './parsers.js';
import calcDiff from './diff.js';
import formatDiff from './formatters.js';

export default function genDiff(filepath1, filepath2, format = 'stylish') {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const diff = calcDiff(obj1, obj2);
  return formatDiff(diff, format);
}
