/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('user.controllers', [])
    .controller('LoginController', [
        '$state', '$scope', 'UserService','$ionicHistory','$ionicLoading',   // <-- controller dependencies
        function ($state, $scope, UserService,$ionicHistory,$ionicLoading) {

            // ng-model holding values from view/html
            $scope.creds = {
                username: "adminuser",
                password: "password"
            };
            
            /**
             *
             */
            $scope.doLogoutAction = function () {
                UserService.logout()
                    .then(function (_response) {
                        if (_response.status) {
                            alert(_response.attributes.username);
                        } else {
                            //alert("logout success " + _response);

                            // transition to next state
                            $state.go('app-login');

                        }
                    }, function (_error) {
                        alert("error logging in " + _error.debug);
                    })
            };

            /**
             *
             */
            $scope.doLoginAction = function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                UserService.login($scope.creds.username, $scope.creds.password)
                    .then(function (_response) {   
                        $ionicLoading.hide();                     
                        //alert("login success " + _response.attributes.username);

                        // transition to next state
                        $ionicHistory.clearCache().then(function () {
                            $state.go('tab.list');
                        });


                    }, function (_error) {
                        $ionicLoading.hide();
                        alert("error logging in " + _error.message);
                    })
            };
            //$scope.doLoginAction();
        }])
    .controller('SignUpController', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.creds = {};

            /**
             *
             */
            $scope.signUpUser = function () {

                UserService.init();

                UserService.createUser($scope.creds).then(function (_data) {
                    $scope.user = _data;

                    alert("Success Creating User Account ");

                    $state.go('tab.list', {});

                }, function (_error) {
                    alert("Error Creating User Account " + _error.debug)
                });
            }
        }]);
