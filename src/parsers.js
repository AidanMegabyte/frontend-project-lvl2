import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import * as path from 'path';
import _ from 'lodash';

const parseYaml = (fileContent) => yaml.load(fileContent);

const parsersByFileType = {
  json: JSON.parse,
  yml: parseYaml,
  yaml: parseYaml,
};

export default function parseFile(filePath) {
  const absoluteFilePath = path.resolve(process.cwd(), filePath);
  const fileExt = _.toLower(path.extname(absoluteFilePath)).slice(1);
  const fileType = fileExt === '' ? 'json' : fileExt;
  const fileContent = readFileSync(filePath, 'utf-8');
  return _.get(parsersByFileType, fileType)(fileContent);
}
