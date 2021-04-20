import { expect, test } from '@jest/globals';
import { promises as fsp } from 'fs';
import { getFixturePath } from './common.js';
import formatDiff from '../src/formatters.js';

const checkFormat = async (diff, formatAs, diffPath) => {
  const diffExpected = (await fsp.readFile(getFixturePath(diffPath), 'utf-8')).slice(0, -1);
  const diffActual = formatDiff(diff, formatAs);
  expect(diffActual).toEqual(diffExpected);
};

test('Stylish formatting', async () => {
  const diff = JSON.parse(await fsp.readFile(getFixturePath('formatters/diff.json'), 'utf-8'));
  await checkFormat(
    diff,
    'stylish',
    'formatters/diff-stylish.txt',
  );
});
