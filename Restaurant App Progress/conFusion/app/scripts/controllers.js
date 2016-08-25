/**
 * Created by Just Nasko on 8/21/2016.
 */

'use strict';
angular.module('confusionApp')
    .controller('MenuController', ['$scope','menuFactory',
        function ($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = "";
        $scope.showDetails = false;

            var dishes = menuFactory.getDishes();
        $scope.dishes= dishes;

        $scope.select = function (setTab) {
            $scope.tab = setTab;

            switch (setTab) {

                case 2:
                    $scope.filtText = 'appetizer';
                    break;
                case 3:
                    $scope.filtText = 'dessert';
                    break;
                case 4:
                    $scope.filtText = 'main';
                    break;
                default :
                    $scope.filtText = '';
                    break;
            }
        };

        $scope.isSelected = function (checkTab) {

            return (this.tab === checkTab);
        };


        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        }
    }])
    .controller('ContactController', ['$scope', function ($scope) {

        $scope.feedback = {
            mychannel: '', firstName: '',
            lastName: '', agree: false, email: ''
        };


        var channels = [{value: 'tel', label: 'Tel'}, {value: 'Email', label: 'Email'}];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])
    .controller('FeedbackController', ['$scope',
        function ($scope) {


        $scope.sendFeedback = function () {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")
                && !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "", firstName: "", lastName: "",
                    agree: false, email: ""
                };

                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        }
    }])
    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory',
        function($scope, $stateParams, menuFactory) {
        var dish= menuFactory.getDish(parseInt($stateParams.id,10));
        $scope.dish = dish;
    }]);