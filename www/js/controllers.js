angular.module('starter.controllers', [])
.controller('ListCtrl', ['$scope','$state','UserService','journalServices',
				 function ($scope,$state,UserService,journalServices) {
	$scope.isLogin = false;	

	UserService.init().then(function(data){
		console.log(data._isCurrentUser);
		$scope.isLogin = data._isCurrentUser;
	});
	$scope.login = function() {
		$state.go('app-login');		
	}
	$scope.logout = function() {
		UserService.logout(function () {
            $state.go('app-login');
        });
	}
	$scope.getAll = function(){
		$scope.journals = [];
		UserService.currentUser().then(function(data){
			console.log(data);
			journalServices.all(data.Id).then(function(data2){
				angular.forEach(data2,function(value,key){
					$scope.journals.push({content: value.attributes.content,id: value.id});
				});
				$scope.$apply(); 
			});	
		});

	}
	$scope.getAll();

	$scope.createJournal = function(journal){
		if(journal.content) {
	    	journalServices.save(journal).then(function(result){
	      		$scope.getAll();
	    	});  
	    	journal.content = '';      
	  	}
	}
}])
.controller('JournalCtrl',function($scope,journal){
	$scope.journal = journal;
	console.log(journal);
	//{{journal.attributes.content}}{{journal.createdAt}}
})
.directive('textarea', function() {
    return {
      restrict: 'E',
      link: function(scope, element, attr) {
        var update = function() {
          element.css("height", "auto");
          var height = element[0].scrollHeight;
          element.css("height", height + "px");
        };
        element.bind('keyup keydown keypress change', update);
        /*
        scope.$watch(attr.ngModel, function() {
          update();
        });
		*/
      }
    };
  });