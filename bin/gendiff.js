#!/usr/bin/env node
import { existsSync, readFileSync } from 'fs';
import { Command } from 'commander/esm.mjs';
import * as path from 'path';
import genDiff from '../src/index.js';

const fileToJson = (filePath) => {
  if (!filePath || filePath === '') {
    throw new Error('Path to file cannot be empty!');
  }
  const absoluteFilePath = path.resolve(process.cwd(), filePath);
  if (!existsSync(absoluteFilePath)) {
    throw new Error(`File ${absoluteFilePath} not found!`);
  }
  const fileContent = readFileSync(absoluteFilePath, { encoding: 'utf8', flag: 'r' });
  return JSON.parse(fileContent);
};

const program = new Command();

program.configureHelp({
  sortOptions: true,
});

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const json1 = fileToJson(filepath1);
    const json2 = fileToJson(filepath2);
    const diff = genDiff(json1, json2);
    console.log(diff);
  });

program.parse();
