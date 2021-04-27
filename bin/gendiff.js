#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import { stylishFormatName } from '../src/common.js';
import genDiff from '../src/index.js';

const program = new Command();

program.configureHelp({
  sortOptions: true,
});

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', stylishFormatName)
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    const diff = genDiff(filepath1, filepath2, format);
    console.log(diff);
  });

program.parse();
