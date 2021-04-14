import { jest, expect, test } from '@jest/globals';
import _ from 'lodash';
import { getFixturePath } from './common.js';
import parseFile from '../src/parsers.js';

const objExpected = { ahalay: 'mahalay' };

const checkJsonParsing = (fixturePath) => {
  const spy = jest.spyOn(_, 'get');
  const objActual = parseFile(getFixturePath(fixturePath));
  expect(objActual).toEqual(objExpected);
  expect(spy.mock.calls[0][1]).toEqual('json');
};

test('Checking file without extension parsing', () => {
  checkJsonParsing('parsers/file-without-ext');
});

test('Checking JSON file parsing', () => {
  checkJsonParsing('parsers/json-file.json');
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
