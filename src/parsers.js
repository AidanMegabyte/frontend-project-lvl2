import { readFileSync } from 'fs';
import * as path from 'path';
import _ from 'lodash';

const parsersByFileType = {
  json: JSON.parse,
};

export default function parseFile(filePath) {
  const absoluteFilePath = path.resolve(process.cwd(), filePath);
  const fileExt = _.toLower(path.extname(absoluteFilePath)).slice(1);
  const fileType = fileExt === '' ? 'json' : fileExt;
  const fileContent = readFileSync(filePath, 'utf-8');
  return _.get(parsersByFileType, fileType)(fileContent);
}
