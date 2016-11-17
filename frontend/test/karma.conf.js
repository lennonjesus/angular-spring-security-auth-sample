module.exports = function(config) {
  config.set({
        basePath: '../',
        frameworks: ['jasmine'],

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'app/hello.js',
            'test/unit/*.spec.js'

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
            'Chrome'
        ],


         // Which plugins to enable
         plugins: [
           'karma-chrome-launcher',
           //'karma-phantomjs-launcher',
           //'karma-coverage',
           'karma-jasmine',
           //'karma-jasmine-html-reporter'
         ],


         // Continuous Integration mode
         // if true, Karma captures browsers, runs the tests and exits
         singleRun: false,

        plugins: [
           'karma-chrome-launcher',
           'karma-jasmine',
           //'karma-jasmine-html-reporter'
        ],

  });
};