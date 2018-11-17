'use strict';

angular.module('bookStoreApp')
  .controller('MainCtrl', function($scope, $http) {
    var generateData = function() {
      var arr = [];
      var letterWords = ["alpha", "bravo", "charlie", "daniel", "earl", "fish", "grace", "henry", "ian", "jack", "karen", "mike", "delta", "alex", "larry", "bob", "zelda"]
      for (var i = 1; i < 60; i++) {
        var id = letterWords[Math.floor(Math.random() * letterWords.length)];
        arr.push({
          "id": id + i,
          "title": "name " + i,
          "author": "author " + i,
          "description": "Description of item #" + i,
          "published": "published" + i,
          "rating": "rating " + id,
          "buy": "Amazon: " + i,
          "bookCover": "https://media.giphy.com/media/12cfPQIOSlNj8Y/giphy.gif"
        });
      }
      return arr;
    }
    $scope.allBooks = generateData();

    $scope.totalItems = $scope.allBooks.length;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 5;

    $scope.$watch("currentPage", function() {
      setPagingData($scope.currentPage);
    });

    function setPagingData(page) {
      var pagedData = $scope.allBooks.slice(
        (page - 1) * $scope.itemsPerPage,
        page * $scope.itemsPerPage
      );
      $scope.paginatedBooks = pagedData;
    }
  });
