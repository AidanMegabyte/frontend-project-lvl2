import { expect, test } from '@jest/globals';
import { promises as fsp } from 'fs';
import { getFixturePath } from './common.js';
import calcDiff from '../src/diff.js';

test('Objects diff calculating', async () => {
  const obj1 = JSON.parse(await fsp.readFile(getFixturePath('diff/1.json'), 'utf-8'));
  const obj2 = JSON.parse(await fsp.readFile(getFixturePath('diff/2.json'), 'utf-8'));
  const diffExpected = JSON.parse(await fsp.readFile(getFixturePath('diff/diff.json'), 'utf-8'));
  const diffActual = calcDiff(obj1, obj2);
  expect(diffActual).toEqual(diffExpected);
});
