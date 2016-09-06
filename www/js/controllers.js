angular.module('blogin.controllers', [])

.controller('ArticlesCtrl', ['$scope', 'Articles', function($scope, Articles) {
  $scope.page = 0;
  $scope.articles = [];
  $scope.morePageExist = true;

  $scope.loadMore = function() {
    Articles.all($scope.page).then(function(data) {
      var length = data.length;

      if(length > 0) {
        $scope.articles = $scope.articles.concat(data);
        $scope.page++;

        if(length < 10) {
          $scope.morePageExist = false;
        }
      }
      else {
        $scope.morePageExist = false;
      }

      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, function(error) {
      console.log(error);
    });
  };
}])

.controller('ArticleDetailCtrl', ['$scope', '$stateParams', '$ionicLoading', 'Articles', function($scope, $stateParams, $ionicLoading, Articles) {
  $ionicLoading.show();

  Articles.get($stateParams.articleId).then(function(data) {
    $ionicLoading.hide();

    $scope.article = data[0];
  }, function(error) {
    $ionicLoading.hide();
    console.log(error);
  });
}])

.controller('CommentsCtrl', ['$scope', '$rootScope', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', 'Comments', function($scope, $rootScope, $stateParams, $ionicLoading, $ionicScrollDelegate, Comments) {
  Comments.check($stateParams.articleId, $rootScope.token).then(function(data) {
    $scope.comments_count = data;
    $scope.presentComments = (parseInt($scope.comments_count) > 0) ? true : false;
    $scope.showComments = $scope.presentComments;
  }, function(error) {
    console.log(error);
  });

  $scope.comments = [];
  $scope.commentsListVisibility = false;
  $scope.commentData = {};
  $scope.showNewCommentForm = false;

  $scope.showCommentForm = function() {
    $scope.showNewCommentForm = true;
    $ionicScrollDelegate.resize();
  };

  $scope.showCommentsSwitcher = function() {
    $scope.showComments = false;
    $scope.commentsListVisibility = true;
    $ionicScrollDelegate.resize();
  };

  $scope.hideComments = function() {
    $scope.showComments = true;
    $scope.commentsListVisibility = false;
    $ionicScrollDelegate.resize();
    $ionicScrollDelegate.scrollBottom(true);
  };

  $scope.getComments = function() {
    if($scope.comments.length === 0) {
      $ionicLoading.show();

      Comments.get($stateParams.articleId).then(function(data) {
        $scope.comments = data;

        $scope.showCommentsSwitcher();
        $ionicLoading.hide();
      }, function(error) {
        $ionicLoading.hide();
        console.log(error);
      });
    }
    else {
      $scope.showCommentsSwitcher();
      $ionicLoading.hide();
    }
  };

  $scope.postComment = function() {
    $ionicLoading.show();
    $scope.commentData.uid = $rootScope.userData.uid;
    $scope.commentData.nid = $stateParams.articleId;

    Comments.post($scope.commentData, $rootScope.token).then(function(data) {
      $scope.comments_count++;

      if($scope.comments.length === 0) {
        $scope.getComments();
      }
      else {
        $scope.comments.unshift({
          picture: $rootScope.userData.picture.url,
          name: $rootScope.userData.name,
          subject: $scope.commentData.subject,
          comment_body: $scope.commentData.comment_body.und[0].value
        });

        $scope.showCommentsSwitcher();
        $ionicLoading.hide();
      }

      $scope.commentData = {};
      $scope.showNewCommentForm = false;
    }, function(error) {
      $ionicLoading.hide();
      console.log(error);
    });
  };
}])