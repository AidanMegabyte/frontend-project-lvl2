import { expect, test } from '@jest/globals';
import { promises as fsp } from 'fs';
import { getFixturePath } from './common.js';
import formatAsStylish from '../src/formatters/stylish.js';
import formatAsPlain from '../src/formatters/plain.js';
import formatAsJson from '../src/formatters/json.js';

const checkFormat = async (formatDiff, diffPath) => {
  const diff = JSON.parse(await fsp.readFile(getFixturePath('formatters/diff.json'), 'utf-8'));
  const diffExpected = (await fsp.readFile(getFixturePath(diffPath), 'utf-8')).slice(0, -1);
  const diffActual = formatDiff(diff);
  expect(diffActual).toEqual(diffExpected);
};

test('Stylish formatting', async () => {
  await checkFormat(
    formatAsStylish,
    'formatters/diff-stylish.txt',
  );
});

test('Plain formatting', async () => {
  await checkFormat(
    formatAsPlain,
    'formatters/diff-plain.txt',
  );
});

test('JSON formatting', async () => {
  await checkFormat(
    formatAsJson,
    'formatters/diff-json.txt',
  );
});
