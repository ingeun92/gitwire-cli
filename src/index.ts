#!/usr/bin/env node
import { Command } from 'commander';
import { trendsCommand } from './commands/trends.js';
import { insightsCommand } from './commands/insights.js';

const program = new Command();

program
  .name('gitwire')
  .description('GitWire CLI - GitHub trend data for developers and AI agents')
  .version('0.1.0');

program.addCommand(trendsCommand);
program.addCommand(insightsCommand);

program.parse();
