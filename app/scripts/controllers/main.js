'use strict';

angular.module('bookStoreApp')
  .controller('MainCtrl', function($scope, $http) {
    var generateData = function() {

      var arr = [{
        "id": 1,
        "title": "In Search of Lost Time",
        "author": "Marcel Proust",
        "description": "In The Guermantes Way Proust's narrator recalls his initiation into the dazzling world of Parisian high society. Looking back over his time in the glamorous salons of the aristocracy, he satirises this shallow world and his own youthful infatuation with it. His observations, and his experiences with his lover Albertine, also educate him in the volatile nature of desire as he walks the path towards adulthood.",
        "published": 1913,
        "rating": 9.8,
        "buy": [{"name": "Amazon", "url": "https://ler.amazon.com.br/kp/embed?asin=B003FXCSFO&preview=newtab&linkCode=kpe&ref_=cm_sw_r_kb_dp_tZ37BbACMD45K"},
                {"name": "Play Store", "url": "https://play.google.com/store/books/details/Marcel_Proust_Swann_s_Way?id=RSLvYXaHbtoC"}],
        "bookCover": "https://images.gr-assets.com/books/1452956236l/12749.jpg"
      },
      {
        "id": 2,
        "title": "Don Quixote",
        "author": "Miguel De Cervantes",
        "description": "Widely regarded as one of the funniest and most tragic books ever written, Don Quixote chronicles the adventures of the self-created knight-errant Don Quixote of La Mancha and his faithful squire, Sancho Panza, as they travel through sixteenth-century Spain. You haven't experienced Don Quixote in English until you've read this masterful translation.",
        "published": 1605,
        "rating": 9.7,
        "buy": [{"name": "Amazon", "url": "https://ler.amazon.com.br/kp/embed?asin=B001R1LCKS&preview=newtab&linkCode=kpe&ref_=cm_sw_r_kb_dp_lx47Bb7XF98RM"}],
        "bookCover": "https://images-na.ssl-images-amazon.com/images/I/41NrvHGS3lL._SX331_BO1,204,203,200_.jpg"
      },
      {
        "id": 3,
        "title": "Ulysses",
        "author": "James Joyce",
        "description": "Ulysses is a novel by Irish writer James Joyce. It was first serialised in parts in the American journal The Little Review from March 1918 to December 1920, and then published in its entirety by Sylvia Beach in February 1922, in Paris. It is considered to be one of the most important works of Modernist literature, and has been called 'a demonstration and summation of the entire movement'. 'Before Joyce, no writer of fiction had so foregrounded the process of thinking.' However, even proponents of Ulysses such as Anthony Burgess have described the book as inimitable, and also possibly mad.",
        "published": 1904,
        "rating": 9.5,
        "buy": [{"name": "Amazon", "url": "https://ler.amazon.com.br/kp/embed?asin=B018INSEQ2&preview=newtab&linkCode=kpe&ref_=cm_sw_r_kb_dp_5z47BbEKY7Q91"}],
        "bookCover": "https://images-na.ssl-images-amazon.com/images/I/51wTLf4JVwL._SX384_BO1,204,203,200_.jpg"
      },
      {
        "id": 4,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "description": "The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career. First published in 1925, this quintessential novel of the Jazz Age has been acclaimed by generations of readers. The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted “gin was the national drink and sex the national obsession,” it is an exquisitely crafted tale of America in the 1920s.",
        "published": 1925,
        "rating": 9.4,
        "buy": [{"name": "Amazon", "url": "https://ler.amazon.com.br/kp/embed?asin=B00EJRPZEQ&preview=newtab&linkCode=kpe&ref_=cm_sw_r_kb_dp_hD47BbFKA46WW"}],
        "bookCover": "https://images-na.ssl-images-amazon.com/images/I/51vv75oglyL._SX326_BO1,204,203,200_.jpg"
      },
      {
        "id": 5,
        "title": "Moby Dick",
        "author": "Herman Melville",
        "description": "Moby-Dick; or, The Whale is a novel by Herman Melville, in which Ishmael narrates the monomaniacal quest of Ahab, captain of the whaler Pequod, for revenge on the albino sperm whale Moby Dick, which on a previous voyage destroyed Ahab's ship and severed his leg at the knee. Although the novel was a commercial failure and out of print at the time of the author's death in 1891, its reputation grew immensely during the twentieth century. D. H. Lawrence called it \"one of the strangest and most wonderful books in the world\"",
        "published": 1851,
        "rating": 9.3,
        "buy": [{"name": "Amazon", "url": "https://www.amazon.com/Moby-Dick-Herman-Melville/dp/1503280780"}, {"name": "iBooks", "url": "https://itunes.apple.com/us/book/moby-dick/id427802472?mt=11"}],
        "bookCover": "https://images-na.ssl-images-amazon.com/images/I/41VnFKC9srL._SX346_BO1,204,203,200_.jpg"
      },
      {
        "id": 6,
        "title": "The Hitchhiker's Guide to the Galaxy",
        "author": "Douglas Adams",
        "description": "Seconds before Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect, a researcher for the revised edition of The Hitchhiker’s Guide to the Galaxy who, for the last fifteen years, has been posing as an out-of-work actor.",
        "published": 1995,
        "rating": 10,
        "buy": [{"name": "Amazon", "url": "https://ler.amazon.com.br/kp/embed?asin=B003GK2180&preview=newtab&linkCode=kpe&ref_=cm_sw_r_kb_dp_mL47BbK8TGD39"}],
        "bookCover": "https://images-na.ssl-images-amazon.com/images/I/51MzUz8rQcL._SX305_BO1,204,203,200_.jpg"
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
