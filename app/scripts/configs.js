'use strict';

angular.module('services.config', [])
  .constant('configuration', {
    rootDir: '/',
    localPath: 'http://127.0.0.1:8080/server/',
    dataDir: 'http://127.0.0.1:9000/data/'
  });
