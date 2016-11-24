module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],

    files: [

       /* bower dependencies */
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',

      /* app source code */
      'app/app.module.js',
      'app/app.routes.js',
      'app/home/home.controller.js',
      'app/navigation/navigation.controller.js',
      'app/navigation/navigation.service.js',

      /* test code */
      'test/unit/home/home.controller.spec.js',
      'test/unit/navigation/navigation.service.spec.js',
      'test/unit/navigation/navigation.controller.spec.js'
    ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browsers: [
      // 'Chrome'
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      //  'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-jasmine',
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,


    reporters: [
        'progress',
        'coverage'
    ],


    preprocessors: {
        'app/*.js' : ['coverage'],
        'app/home/*.js' : ['coverage'],
        'app/navigation/*.js' : ['coverage']
    },

    coverageReporter: {
          dir: 'test/coverage/',
          subdir: 'phantom',
          reporters: [
            { type: 'html' },
            { type: 'lcov' }
          ]
        }

  });

};
