import { expect, test } from '@jest/globals';
import { promises as fsp } from 'fs';
import { getFixturePath } from './common.js';
import formatAsStylish from '../src/formatters/stylish.js';
import formatAsPlain from '../src/formatters/plain.js';

const checkFormat = async (diff, formatDiff, diffPath) => {
  const diffExpected = (await fsp.readFile(getFixturePath(diffPath), 'utf-8')).slice(0, -1);
  const diffActual = formatDiff(diff);
  expect(diffActual).toEqual(diffExpected);
};

test('Stylish formatting', async () => {
  const diff = JSON.parse(await fsp.readFile(getFixturePath('formatters/diff.json'), 'utf-8'));
  await checkFormat(
    diff,
    formatAsStylish,
    'formatters/diff-stylish.txt',
  );
});

test('Plain formatting', async () => {
  const diff = JSON.parse(await fsp.readFile(getFixturePath('formatters/diff.json'), 'utf-8'));
  await checkFormat(
    diff,
    formatAsPlain,
    'formatters/diff-plain.txt',
  );
});
