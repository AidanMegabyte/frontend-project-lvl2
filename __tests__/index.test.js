import { expect, test } from '@jest/globals';
import { promises as fsp } from 'fs';
import { getFixturePath } from './common.js';
import genDiff from '../src/index.js';

const checkDiff = async (filePath1, filePath2, diffPath) => {
  const diffExpected = (await fsp.readFile(getFixturePath(diffPath), 'utf-8')).slice(0, -1);
  const diffActual = genDiff(getFixturePath(filePath1), getFixturePath(filePath2));
  expect(diffActual).toEqual(diffExpected);
};

test('JSONs diff generation', async () => {
  await checkDiff(
    'genDiff/json/1.json',
    'genDiff/json/2.json',
    'genDiff/diff.txt',
  );
});

test('YAMLs diff generation', async () => {
  await checkDiff(
    'genDiff/yaml/1.yaml',
    'genDiff/yaml/2.yml',
    'genDiff/diff.txt',
  );
});
