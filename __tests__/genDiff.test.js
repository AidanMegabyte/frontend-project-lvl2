import { expect, test } from '@jest/globals';
import { promises as fsp } from 'fs';
import * as path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (fixtureFileName) => path.resolve(process.cwd(), `__fixtures__/${fixtureFileName}`);

test('Empty JSONs diff generation', async () => {
  const json1 = {};
  const json2 = {};
  const diffExpected = '{\n}';
  const diffActual = genDiff(json1, json2);
  expect(diffActual).toEqual(diffExpected);
});

test('Plain JSONs diff generation', async () => {
  const json1 = JSON.parse(await fsp.readFile(getFixturePath('plain-json-1.json'), 'utf-8'));
  const json2 = JSON.parse(await fsp.readFile(getFixturePath('plain-json-2.json'), 'utf-8'));
  const diffExpected = (await fsp.readFile(getFixturePath('plain-json-diff.txt'), 'utf-8')).slice(0, -1);
  const diffActual = genDiff(json1, json2);
  expect(diffActual).toEqual(diffExpected);
});

test('Plain JSONs with \'undefined\' and \'null\' fields diff generation', async () => {
  const json1 = JSON.parse(await fsp.readFile(getFixturePath('plain-json-1.json'), 'utf-8'));
  const json2 = JSON.parse(await fsp.readFile(getFixturePath('plain-json-2.json'), 'utf-8'));
  json1.timeout = undefined;
  let diffExpected = (await fsp.readFile(getFixturePath('plain-json-null-undefined-diff-1.txt'), 'utf-8')).slice(0, -1);
  let diffActual = genDiff(json1, json2);
  expect(diffActual).toEqual(diffExpected);
  json2.timeout = null;
  diffExpected = (await fsp.readFile(getFixturePath('plain-json-null-undefined-diff-2.txt'), 'utf-8')).slice(0, -1);
  diffActual = genDiff(json1, json2);
  expect(diffActual).toEqual(diffExpected);
});
