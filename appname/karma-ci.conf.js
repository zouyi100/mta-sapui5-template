module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['ui5'],
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromiumNoSandbox'],
    customLaunchers: {
      ChromiumNoSandbox: {
        base: 'ChromiumHeadless',
        flags: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-translate', '--disable-extensions']
      }
    },
    singleRun: true,
    preprocessors: {
      "{webapp,webapp/controller}/*.js": ["coverage"]
		},
    coverageReporter: {
      reporters: [{
        type : 'cobertura',
        dir : 's4hana_pipeline/reports/coverage-reports/backend-unit/',
        subdir: '.'
      },{
        type : 'cobertura',
        dir : 's4hana_pipeline/reports/coverage-reports/backend-integration/',
        subdir: '.'
      }]
    }
  })
}
