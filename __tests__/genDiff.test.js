import { expect, test } from '@jest/globals';
import { promises as fsp } from 'fs';
import { getFixturePath } from './common.js';
import genDiff from '../src/index.js';

test('Empty JSONs diff generation', async () => {
  const json1Path = getFixturePath('genDiff/json/empty/1.json');
  const json2Path = getFixturePath('genDiff/json/empty/2.json');
  const diffExpected = (await fsp.readFile(getFixturePath('genDiff/json/empty/diff.txt'), 'utf-8')).slice(0, -1);
  const diffActual = genDiff(json1Path, json2Path);
  expect(diffActual).toEqual(diffExpected);
});

test('Plain JSONs diff generation', async () => {
  const json1Path = getFixturePath('genDiff/json/plain/1.json');
  const json2Path = getFixturePath('genDiff/json/plain/2.json');
  const diffExpected = (await fsp.readFile(getFixturePath('genDiff/json/plain/diff.txt'), 'utf-8')).slice(0, -1);
  const diffActual = genDiff(json1Path, json2Path);
  expect(diffActual).toEqual(diffExpected);
});
