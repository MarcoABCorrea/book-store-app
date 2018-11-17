'use strict';

angular.module('bookStoreApp')
  .controller('MainCtrl', function($scope, $http) {
    var generateData = function() {
      var id = 0;
      var arr = [{
        "id": id ++,
        "title": "In Search of Lost Time",
        "author": "Marcel Proust",
        "description": "In The Guermantes Way Proust's narrator recalls his initiation into the dazzling world of Parisian high society. Looking back over his time in the glamorous salons of the aristocracy, he satirises this shallow world and his own youthful infatuation with it. His observations, and his experiences with his lover Albertine, also educate him in the volatile nature of desire as he walks the path towards adulthood.",
        "published": 1913,
        "rating": 9.8,
        "buy": [{"name": "Amazon", "url": "https://ler.amazon.com.br/kp/embed?asin=B003FXCSFO&preview=newtab&linkCode=kpe&ref_=cm_sw_r_kb_dp_tZ37BbACMD45K"},
                {"name": "Play Store", "url": "https://play.google.com/store/books/details/Marcel_Proust_Swann_s_Way?id=RSLvYXaHbtoC"}],
        "bookCover": "https://images.gr-assets.com/books/1452956236l/12749.jpg"
      }];

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
