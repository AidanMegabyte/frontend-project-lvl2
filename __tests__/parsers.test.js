import { jest, expect, test } from '@jest/globals';
import _ from 'lodash';
import { getFixturePath } from './common.js';
import parseFile from '../src/parsers.js';

test('Checking file without extension parsing', () => {
  const spy = jest.spyOn(_, 'get');
  const objExpected = { ahalay: 'mahalay' };
  const objActual = parseFile(getFixturePath('parsers/file-without-ext'));
  expect(objActual).toEqual(objExpected);
  expect(spy.mock.calls[0][1]).toEqual('json');
});

test('Checking JSON file parsing', () => {
  const spy = jest.spyOn(_, 'get');
  const objExpected = { ahalay: 'mahalay' };
  const objActual = parseFile(getFixturePath('parsers/json-file.json'));
  expect(objActual).toEqual(objExpected);
  expect(spy.mock.calls[0][1]).toEqual('json');
});
