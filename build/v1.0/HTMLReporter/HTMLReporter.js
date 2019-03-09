const WDIOReporter = require('@wdio/reporter').default;
const fs = require('fs');
const path = require('path');
const Template = require('./assets/templates');

module.exports =  class HTMLReporter extends WDIOReporter {
    constructor(options) {
        options = Object.assign(options, {stdout: true})
        super(options)
        this.features = [];
        this.scenario = {};
        this.feature = {};
        this.featureFlag = false;
        this.scenarioFlag = false;
    }
    onRunnerStart(runner) {
        this.write(`HTML Reporter: 😒 Tests Starting Running on ${runner.capabilities.browserName} \n\n`);
    }

    onRunnerEnd(runner) {
        if(this.options.outputDir)
            this.createTestReport(this.features, this.options.outputDir);
        else {
          this.createTestReport(this.features, path.normalize(__dirname+"/../reports"));
        }
    }

    onSuiteStart(suite) {
        if(!this.featureFlag) {
            this.featureFlag = true;
            this.feature = {
                title: suite.title,
                scenarios: []
            }
        } else if(!this.scenarioFlag) {
            this.scenarioFlag = true;
            this.scenario = {
                title: suite.title,
                steps: []
            }
        }
    }

    onSuiteEnd(suite) {
        if(this.scenarioFlag) {
            this.scenarioFlag = false;
            this.feature.scenarios.push(this.scenario);
        } else if (this.featureFlag) {
            this.featureFlag = false;
            this.features.push(this.feature);
        }
    }

    onTestPass(test) {
        if(this.scenarioFlag) {
            this.scenario.steps.push({
                title: test.title,
                result: true
            })
        }
    }

    onTestFail(test) {
        if(this.scenarioFlag) {
            this.scenario.steps.push({
                title: test.title,
                result: false
            })
        }
    }

    createTestReport(data, testsOutputPath) {
        let filenamePrefix = this.createFileName();
        testsOutputPath = testsOutputPath + '/' + filenamePrefix;
        this.makeTestOutputDirectory(testsOutputPath);
        this.writeDataToFile(data, testsOutputPath);
        this.createHTMLReport(testsOutputPath, filenamePrefix);
        this.moveAssets(testsOutputPath);
    }

    writeDataToFile(data, testsOutputPath) {
        console.log(testsOutputPath);
        let dataJS = 'let data = ' + JSON.stringify(data) + ' \n window.data = data';
        fs.writeFile(testsOutputPath + "/data.js", dataJS, 'utf-8', err => {
            if(err) this.write(err.message + "\n");
        })
    }

    createHTMLReport(testsOutputPath, filenamePrefix) {
        let filename = filenamePrefix + '.html';
            fs.writeFile(testsOutputPath + "/" + filename, Template.html, 'utf-8', err => {
                if(err) this.write(err.message + "\n");
            })
    }

    createFileName() {
        let date = new Date();
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + 'T' +
            date.getHours() + 'H' + date.getMinutes() + 'M' + date.getSeconds() + 'S';
    }

    makeTestOutputDirectory(testsOutputPath) {
        fs.mkdirSync(testsOutputPath, {recursive: true}, err => {
            if(err) this.write(err.message + "\n");
        })
    }

    moveAssets(testsOutputPath) {
        fs.copyFile('test/reporter/HTMLReporter/assets/index.js', testsOutputPath + '/index.js', (err) => {
            if(err) this.write(err.message + "\n");
        });
        fs.copyFile('test/reporter/HTMLReporter/assets/style.css', testsOutputPath + '/style.css', (err) => {
            if(err) this.write(err.message + "\n");
        });
    }
}