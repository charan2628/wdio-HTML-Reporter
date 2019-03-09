const WDIOReporter = require('@wdio/reporter').default;
const fs = require('fs');
const path = require('path');
const Template = require('./assets/templates');

module.exports =  class HTMLReporter extends WDIOReporter {
    constructor(options) {
        options = Object.assign(options, {stdout: true})
        super(options)
        this.metaData = {};
        this.features = [];
        this.scenario = {};
        this.feature = {};
        this.featureFlag = false;
        this.scenarioFlag = false;
        this.featuresPassed = 0;
        this.featuresFailed = 0;
        this.scenariosPassed = 0;
        this.scenariosFailed = 0;
        this.totalScenariosPassed = 0;
        this.totalScenariosFailed = 0;
        this.testsPassed = 0;
        this.testsFailed = 0;
        this.totalTestsPassed = 0;
        this.totalTestsFailed = 0;
    }
    onRunnerStart(runner) {
        this.metaData.browser = runner.capabilities.browserName + ' v' + runner.capabilities.browserVersion;
        this.metaData.startTime = new Date(runner.start).toString();
    }

    onRunnerEnd(runner) {
        this.metaData.duration = runner.duration;
        this.metaData.scenarios = {};
        this.metaData.features = {};
        this.metaData.tests = {};
        this.metaData.scenarios.passed = this.totalScenariosPassed;
        this.metaData.scenarios.failed = this.totalScenariosFailed;
        this.metaData.features.failed = this.featuresFailed;
        this.metaData.features.passed = this.featuresPassed;
        this.metaData.tests.passed = this.totalTestsPassed;
        this.metaData.tests.failed = this.totalTestsFailed;
        let data = this.createData()
        if(this.options.outputDir)
            this.createTestReport(data, this.options.outputDir);
        else {
          this.createTestReport(data, path.normalize(__dirname+"/../reports"));
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
            if(this.testsFailed !== 0) {
                this.scenariosFailed++;
                this.totalScenariosFailed++;
                this.testsPassed = 0;
                this.testsFailed = 0;
            } else {
                this.scenariosPassed++;
                this.totalScenariosPassed++;
                this.testsPassed = 0;
                this.testsFailed = 0;
            }
        } else if (this.featureFlag) {
            this.featureFlag = false;
            this.features.push(this.feature);
            if(this.scenariosFailed !== 0) {
                this.featuresFailed++;
                this.scenariosFailed = 0;
                this.scenariosPassed = 0;
            } else {
                this.featuresPassed++;
                this.scenariosFailed = 0;
                this.scenariosPassed = 0;
            }
        }
    }

    onTestPass(test) {
        if(this.scenarioFlag) {
            this.scenario.steps.push({
                title: test.title,
                result: true
            })
            this.testsPassed++;
            this.totalTestsPassed++;
        }
    }

    onTestFail(test) {
        if(this.scenarioFlag) {
            this.scenario.steps.push({
                title: test.title,
                result: false
            })
            this.testsFailed++;
            this.totalTestsFailed++;
        }
    }

    createData() {
         return {
            metaData: this.metaData,
            features: this.features
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
        fs.copyFileSync(path.normalize(__dirname+"/assets/index.js"), testsOutputPath + '/index.js', (err) => {
            if(err) this.write(err.message + "\n");
        });
    }
}