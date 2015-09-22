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
    console.log('begin list');
}])
.controller('JournalCtrl',function($scope,journal,journalServices,$state,$ionicHistory,$ionicNavBarDelegate){
	$scope.journal = journal;
	console.log(journal);
    $scope.clear = function(){
        $scope.journal.attributes.content = '';
    };
    $scope.save = function(){
        var journal = {content: $scope.journal.attributes.content,id: $scope.journal.id};
        if(journal.content == ''|| journal.content==undefined) {
            console.log('del');
            journalServices.delete(journal.id).then(function(res){
                console.log($ionicHistory.viewHistory());
                $ionicHistory.clearCache().then(function(){
                    $state.go('tab.list');
                });

            });
        }
        else{
            console.log('save');
            journalServices.save(journal).then(function(res){
                console.log(res);
                $ionicHistory.clearCache();
            });
        }
    }
    $scope.$on('$ionicView.afterLeave', function(){
        $ionicHistory.clearCache().then(function () {
            console.log('afterLeave');
        });
        $ionicHistory.clearHistory();
        $ionicNavBarDelegate.showBackButton(false);

    });
	//{{journal.attributes.content}}{{journal.createdAt}}
})
.directive('textarea', function($timeout) {
    return {
      restrict: 'E',
      link: function(scope, element, attr) {
        var update = function() {
          element.css("height", "auto");
          var height = element[0].scrollHeight;
          element.css("height", height + "px");
          console.log('height',height);
        };
        element.bind('keyup keydown keypress change load focus', update);

        scope.$watch(attr.ngModel, function() {
            $timeout(function() {
                element[0].focus();
            },500);
        });

      }
    };
  });