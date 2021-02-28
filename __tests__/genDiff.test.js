import { expect, test } from '@jest/globals';
import { promises as fsp } from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (fixtureFileName) => `${process.cwd()}/__fixtures__/${fixtureFileName}`;

test('Plain JSONs diff generation', async () => {
  const json1 = JSON.parse(await fsp.readFile(getFixturePath('plain-json-1.json'), 'utf-8'));
  const json2 = JSON.parse(await fsp.readFile(getFixturePath('plain-json-2.json'), 'utf-8'));
  const diffExpected = (await fsp.readFile(getFixturePath('plain-json-diff.txt'), 'utf-8')).slice(0, -1);
  const diffActual = genDiff(json1, json2);
  expect(diffActual).toEqual(diffExpected);
});
