import { expect, test } from '@jest/globals';
import { promises as fsp } from 'fs';
import { getFixturePath } from './common.js';
import genDiff from '../src/index.js';

const checkDiff = async (filePath1, filePath2, diffPath) => {
  const diffExpected = (await fsp.readFile(getFixturePath(diffPath), 'utf-8')).slice(0, -1);
  const diffActual = genDiff(getFixturePath(filePath1), getFixturePath(filePath2));
  expect(diffActual).toEqual(diffExpected);
};

test('Empty JSONs diff generation', async () => {
  await checkDiff(
    'genDiff/json/empty/1.json',
    'genDiff/json/empty/2.json',
    'genDiff/json/empty/diff.txt',
  );
});

test('Plain JSONs diff generation', async () => {
  await checkDiff(
    'genDiff/json/plain/1.json',
    'genDiff/json/plain/2.json',
    'genDiff/json/plain/diff.txt',
  );
});

test('Empty YAMLs diff generation', async () => {
  await checkDiff(
    'genDiff/yaml/empty/1.yaml',
    'genDiff/yaml/empty/2.yaml',
    'genDiff/yaml/empty/diff.txt',
  );
});

test('Plain YAMLs diff generation', async () => {
  await checkDiff(
    'genDiff/yaml/plain/1.yaml',
    'genDiff/yaml/plain/2.yaml',
    'genDiff/yaml/plain/diff.txt',
  );
});
