var Jasmine = require('jasmine');
var reporters = require('jasmine-reporters');
const webpackRunner = require('../../webpackRunner');
var config = require('./webpack.config');
var fs = require('fs-extra');

var removeTempDirectory = function () {
  fs.removeSync(__dirname + '/.tmp');
};

webpackRunner.run(config)
  .then(function () {
    console.log('Starting tests:');

    var jasmine = new Jasmine();

    jasmine.loadConfig({
      "spec_dir": "test/unit/server",
      "spec_files": [
        "./.tmp/test.js"
      ],
      "stopSpecOnExpectationFailure": false,
      "random": false
    });

    jasmine.configureDefaultReporter({});

    var junitReporter = new reporters.JUnitXmlReporter({
      savePath: __dirname + '/../../../test-output',
      filePrefix: 'server.unit',
      consolidateAll: true
    });

    jasmine.addReporter(junitReporter);

    return new Promise(function (resolve, reject) {
      jasmine.completionReporter.onComplete(function (passed) {
        if (passed) {
          resolve();
        } else {
          reject();
        }
      });
      jasmine.execute();
    });
  })
  .finally(function () {
    removeTempDirectory();
  })
  .then(function () {
    process.exit(0);
  }, function () {
    process.exit(1);
  });