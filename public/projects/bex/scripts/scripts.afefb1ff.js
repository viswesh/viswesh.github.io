'use strict';

/**
 * @ngdoc overview
 * @name bexApp
 * @description
 * # bexApp
 *
 * Main module of the application.
 */
angular
  .module('bexApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/collections', {
        templateUrl: 'views/collections.html',
        controller: 'CollectionsCtrl',
        controllerAs: 'collections'
      })
      .otherwise({
        redirectTo: '/'
      });

  });

'use strict';

/**
 * @ngdoc function
 * @name bexApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bexApp
 */
angular.module('bexApp')
  .controller('MainCtrl', ['bexService', '$scope', '$timeout', '$interval', '$http', function (bexService, $scope, $timeout, $interval, $http) {
  	$scope.books=[];
  	$scope.allowremove=false;
  	$scope.counter=20;  
  	$scope.counterpolling = null;
  	$scope.collectedItems=[];

	$scope.searchParam=null;
	$scope.searchParamDefinition=null; 

	$scope.init=function() {
		if(!$scope.searchParam) {
			bexService.getRandomWord().then(function(data){
				$scope.searchParam=data.data;
				getDefinition();
				getList();
			});
		} else {
			getDefinition();
			getList();
		}
	}

	function getDefinition() {
		bexService.getDefinition($scope.searchParam).then(function(data){
			if(data.data.definitions[0] && data.data.definitions[0].text) {
				$scope.searchParamDefinition=data.data.definitions[0].text;	
			} else {
				$scope.searchParamDefinition="Meaning unknown";	
			}
			
		});
	}
	
	function getList() {
		bexService.getBookList($scope.searchParam).then(function(data){
			$scope.books=data.data.items;
			startCounter();
		});
	}


	function startCounter() {
		$scope.counterpolling = $interval(function () {
										if($scope.counter == 0) {
											$scope.stopInterval();  
											$scope.searchParam=null;
	            							$scope.counter=20;
	            							$scope.init();                         
										}
										$scope.counter--;
                                    }, 1000);  
	}

	$scope.init();

	$scope.toggleStartStop = function() {
		     if (angular.isDefined($scope.counterpolling)) {
		     	$scope.stopInterval();
		     } else {
		     	startCounter();
		     }
	}

	$scope.stopInterval = function() {
                                if (angular.isDefined($scope.counterpolling)) {
                                    $interval.cancel($scope.counterpolling);
                                    $scope.counterpolling = undefined;
                                }
                            };  

    function saveBooks() {
    	var savedbooks=getSavedBooks();
    	angular.forEach($scope.books,function(value,index){
               if(value.added) {
				savedbooks.push($scope.books[index]);
               }
            })

    	localStorage.savedbooks = JSON.stringify(savedbooks);
    	console.log(savedbooks);
    }

    function getSavedBooks() {
    	if (localStorage.savedbooks) {
    		return JSON.parse(localStorage.savedbooks);
    	} else {
    		return [];
    	}
    }

    $scope.$on("$destroy", function() {
        $scope.stopInterval();
        saveBooks(); 
    });

	
  }]);

'use strict';

/**
 * @ngdoc function
 * @name bexApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bexApp
 */
angular.module('bexApp')
  .controller('AboutCtrl', function () {
   
  });

'use strict';

/**
 * @ngdoc service
 * @name bexApp.bexService
 * @description
 * # bexService
 * Service in the bexApp.
 */
angular.module('bexApp')
  .service('bexService', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = this;

    service.getBookList = function(searchParam) {
    	return $http.get('https://www.googleapis.com/books/v1/volumes?q='+searchParam);
    }

    service.getRandomWord = function() {
    	return $http.get('http://randomword.setgetgo.com/get.php');
    }

    service.getDefinition = function(searchParam) {    	
		return $http({
					method: 'GET', 
					url: "https://montanaflynn-dictionary.p.mashape.com/define?word="+searchParam,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded',
					'X-Mashape-Key' : "5sd1WcBtGAmsh7BEwlHtlP2DueeTp1kKiQwjsny8xJ60gXLgRv"
						}
				});	
    }

  }]);

'use strict';

/**
 * @ngdoc function
 * @name bexApp.controller:CollectionsCtrl
 * @description
 * # CollectionsCtrl
 * Controller of the bexApp
 */
angular.module('bexApp')
  .controller('CollectionsCtrl', ['$scope',function ($scope) {
  	$scope.books=[];
  	$scope.allowremove=true;
    
	if (localStorage.savedbooks) {
                    $scope.books = JSON.parse(localStorage.savedbooks);
                }


  }]);

'use strict';

/**
 * @ngdoc directive
 * @name bexApp.directive:bookList
 * @description
 * # bookList
 */
angular.module('bexApp')
  .directive('bookList', function () {
    return {
      templateUrl: 'views/booklist.html',
      restrict: 'E',
      replace: true,
      scope: true,
      controller: function ($scope) {
        $scope.toggleCollect =function(book) {    	
	    	 book.added=!book.added;    	
	      };

		    $scope.removeBook=function(book) {
		    	var savedbooks=JSON.parse(localStorage.savedbooks);
		    	angular.forEach(savedbooks, function(value, key) {
		    		if(book.id == value.id) {
		    			savedbooks.splice(key, 1);  	
		    		}
		    	});
		    	$scope.books = savedbooks;
		    	localStorage.savedbooks = JSON.stringify(savedbooks);
    		};

        $scope.showDetails = function($event) {
          var target = $event.target;
          var panel = $( $event.target.parentElement.parentElement.nextElementSibling );
          
          //Using jQuery to support IE8 and backwards
          if (panel.hasClass("visible")) {
            panel.removeClass('visible').animate({'margin-top':'0px', 'height':'0px', 'width':'0px' });
            panel.children().hide();
          } else {

            $('.slide-panel').removeClass('visible').css({'margin-top':'0px', 'height':'0px', 'width':'0px' });
            $('.slide-panel').children().hide();


            panel.addClass('visible').animate({'margin-top':'0px', 'height':'300px', 'width':'500px' });
             panel.children().show();
          } 
          return false; 
        }



    	}
    }
  });
