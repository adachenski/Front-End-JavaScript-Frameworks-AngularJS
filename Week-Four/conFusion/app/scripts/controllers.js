'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.tab = 1;
        $scope.showMenu = false;
        $scope.message ='Loading...Menu';
        $scope.filtText = '';
        $scope.showDetails = false;

        menuFactory.getDishes().query(function(response){

            $scope.dishes = response;
            $scope.showMenu=true;
        },function(response){
            $scope.messege = 'Error: '+response.status+' '+response.statusText;
        });


        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('ContactController', ['$scope','feedbackFactory', function ($scope,feedbackFactory) {

        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};

        var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];

        feedbackFactory.getFeedbacks().query(
            function(response){
                $scope.currentFeedback =response;

            },function(response){
                $scope.messege = 'Error: '+response.status+' '+response.statusText;
            });
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope','$stateParams','feedbackFactory',
        function ($scope,$stateParams, feedbackFactory) {

        $scope.sendFeedback = function () {
            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {

                console.log('feedback send');
                $scope.currentFeedback.push($scope.feedback);
                feedbackFactory.getFeedbacks().update($scope.feedback);
                $scope.feedback = {mychannel: "", firstName: "",
                    lastName: "", agree: false, email: ""};
                $scope.feedbackForm.$setPristine();

            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams',
        'menuFactory', function ($scope, $stateParams, menuFactory) {

        $scope.message='Loading...DD';
        $scope.showDish = false;

        menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(function(response){
                $scope.dish=response;
                $scope.showDish = true;
            },function(response){
                $scope.messege = 'Error: '+response.status+' '+response.statusText;
            })

    }])

    .controller('DishCommentController', ['$scope','menuFactory', function ($scope,menuFactory) {

        $scope.mycomment = {rating: 5, comment: "", author: "", date: ""};

        $scope.submitComment = function () {

            $scope.mycomment.date = new Date().toISOString();
            console.log($scope.mycomment);

            $scope.dish.comments.push($scope.mycomment);

            menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);

            $scope.commentForm.$setPristine();

            $scope.mycomment = {rating: 5, comment: "", author: "", date: ""};
        }
    }])
    .controller('IndexController', ['$scope','corporateFactory','menuFactory',
        function ($scope,corporateFactory,menuFactory) {

            $scope.message='Loading Index...';
            $scope.showPromotion=false;
            $scope.showMenu = false;
            $scope.showChef = false;

            corporateFactory.getLeaders().query(function(resource){   //.get({id:0});
                $scope.leader = resource[3];
                $scope.showChef = true;
            },function(response){
                $scope.message = 'Loading Chef Error: '
                +response.status+' '+response.statusText;
            });

            menuFactory.getPromotions().query(function(response){
                $scope.promotion =response[0];
                $scope.showPromotion = true;
            },function(response){
                $scope.message = 'Loading Promotion Error: '
                +response.status+' '+response.statusText;
            });

            menuFactory.getDishes().query(function(response){
                $scope.dish =response[0];
                $scope.showMenu = true;
            },function(response){
                $scope.message = 'Loading Dish Error: '
                +response.status+' '+response.statusText;
            });

    }])
    .controller('AboutController',['$scope','corporateFactory',
        function($scope, corporateFactory){

            corporateFactory.getLeaders().query(function(resource){   //.get({id:0});
                $scope.leaders = resource;
                $scope.showChef = true;
            },function(response){
                $scope.message = 'Loading Leaders Error: '
                +response.status+' '+response.statusText;
            });
    }]);