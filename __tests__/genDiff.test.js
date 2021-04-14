import { expect, test } from '@jest/globals';
import { promises as fsp } from 'fs';
import { getFixturePath } from './common.js';
import genDiff from '../src/index.js';

test('Empty JSONs diff generation', async () => {
  const diffExpected = (await fsp.readFile(getFixturePath('genDiff/json/empty/diff.txt'), 'utf-8')).slice(0, -1);
  const diffActual = genDiff(
    getFixturePath('genDiff/json/empty/1.json'),
    getFixturePath('genDiff/json/empty/2.json'),
  );
  expect(diffActual).toEqual(diffExpected);
});

test('Plain JSONs diff generation', async () => {
  const diffExpected = (await fsp.readFile(getFixturePath('genDiff/json/plain/diff.txt'), 'utf-8')).slice(0, -1);
  const diffActual = genDiff(
    getFixturePath('genDiff/json/plain/1.json'),
    getFixturePath('genDiff/json/plain/2.json'),
  );
  expect(diffActual).toEqual(diffExpected);
});

test('Empty YAMLs diff generation', async () => {
  const diffExpected = (await fsp.readFile(getFixturePath('genDiff/yaml/empty/diff.txt'), 'utf-8')).slice(0, -1);
  const diffActual = genDiff(
    getFixturePath('genDiff/yaml/empty/1.yaml'),
    getFixturePath('genDiff/yaml/empty/2.yaml'),
  );
  expect(diffActual).toEqual(diffExpected);
});

test('Plain YAMLs diff generation', async () => {
  const diffExpected = (await fsp.readFile(getFixturePath('genDiff/yaml/plain/diff.txt'), 'utf-8')).slice(0, -1);
  const diffActual = genDiff(
    getFixturePath('genDiff/yaml/plain/1.yaml'),
    getFixturePath('genDiff/yaml/plain/2.yaml'),
  );
  expect(diffActual).toEqual(diffExpected);
});
