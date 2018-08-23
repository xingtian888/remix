const commander = require('commander')
const Web3 = require('web3')
const RemixTests = require('./index.js')
const fs = require('fs')

const Provider = require('remix-simulator').Provider

const version = require('../package.json').version

commander.version(version)

commander.command('version').description('output the version number').action(function () {
  console.log(version)
});

commander.command('help').description('output usage information').action(function () {
  commander.help()
});

commander.action(function (filename) {
  let web3 = new Web3()
  // web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'))
  web3.setProvider(new Provider())
  // web3.setProvider(new web3.providers.WebsocketProvider('ws://localhost:8546'))

  let isDirectory = fs.lstatSync(filename).isDirectory()
  RemixTests.runTestFiles(filename, isDirectory, web3)
})

if (!process.argv.slice(2).length) {
  console.log('please specify filename')
}

commander.parse(process.argv)
