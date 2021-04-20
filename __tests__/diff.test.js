import { expect, test } from '@jest/globals';
import { promises as fsp } from 'fs';
import { getFixturePath } from './common.js';
import calcDiff from '../src/diff.js';

const checkDiff = async (objPath1, objPath2, diffPath) => {
  const obj1 = JSON.parse(await fsp.readFile(getFixturePath(objPath1), 'utf-8'));
  const obj2 = JSON.parse(await fsp.readFile(getFixturePath(objPath2), 'utf-8'));
  const diffExpected = JSON.parse(await fsp.readFile(getFixturePath(diffPath), 'utf-8'));
  const diffActual = calcDiff(obj1, obj2);
  expect(diffActual).toEqual(diffExpected);
};

test('Empty objects diff calculating', async () => {
  await checkDiff(
    'diff/empty/1.json',
    'diff/empty/2.json',
    'diff/empty/diff.json',
  );
});

test('Non-empty objects diff calculating', async () => {
  await checkDiff(
    'diff/plain/1.json',
    'diff/plain/2.json',
    'diff/plain/diff.json',
  );
});
