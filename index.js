#!/usr/bin/env node

const { Command } = require("commander");
const expense = require("../src/expenseService");

const program = new Command();

program.name("expense-cli");