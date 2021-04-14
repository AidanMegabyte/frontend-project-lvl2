import { jest, expect, test } from '@jest/globals';
import _ from 'lodash';
import { getFixturePath } from './common.js';
import parseFile from '../src/parsers.js';

const objExpected = { ahalay: 'mahalay' };

test('Checking file without extension parsing', () => {
  const spy = jest.spyOn(_, 'get');
  const objActual = parseFile(getFixturePath('parsers/file-without-ext'));
  expect(objActual).toEqual(objExpected);
  expect(spy.mock.calls[0][1]).toEqual('json');
});

test('Checking JSON file parsing', () => {
  const spy = jest.spyOn(_, 'get');
  const objActual = parseFile(getFixturePath('parsers/json-file.json'));
  expect(objActual).toEqual(objExpected);
  expect(spy.mock.calls[0][1]).toEqual('json');
});

test('Checking YAML file parsing', () => {
  const spy = jest.spyOn(_, 'get');
  let objActual = parseFile(getFixturePath('parsers/yaml-file.yaml'));
  expect(objActual).toEqual(objExpected);
  objActual = parseFile(getFixturePath('parsers/yml-file.yml'));
  expect(objActual).toEqual(objExpected);
  expect(spy.mock.calls[0][1]).toEqual('yaml');
  expect(spy.mock.calls[1][1]).toEqual('yml');
});
