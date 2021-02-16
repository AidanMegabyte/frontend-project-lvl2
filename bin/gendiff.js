#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';

const program = new Command();

program.configureHelp({
  sortOptions: true,
});

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format');

program.parse();
