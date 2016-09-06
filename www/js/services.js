angular.module('blogin.services', [])

.factory('Categories', ['$http', '$q', 'config', function($http, $q, config) {

  //Endpoints Variables.
  var categoriesEndpoint = 'api/categories',
      categoryEndpoint = 'api/category/';

  return {

     /*
     * Return All Categories.
     */
    all: function() {
      var defer = $q.defer();

      $http({
        method    : 'GET',
        url       : config.serviceBaseUrl + categoriesEndpoint,
        dataType  : 'json',
      })
      .success(function(data, status, headers, config) {
        defer.resolve(data);
      })
      .error(function(data, status, headers, config) {
        defer.reject(data);
      });

      return defer.promise;
    },

    /*
     * Return Category by ID.
     */
    get: function(catId, page) {
      var defer = $q.defer();

      $http({
        method    : 'GET',
        url       : config.serviceBaseUrl + categoryEndpoint + catId,
        dataType  : 'json',
        params    : {
          page: page,
        },
      })
      .success(function(data, status, headers, config) {
        defer.resolve(data);
      })
      .error(function(data, status, headers, config) {
        defer.reject(data);
      });

      return defer.promise;
    }
  }
}])

.factory('Articles', ['$http', '$q', 'config', function($http, $q, config) {

  //Endpoints Variables.
  var blogEndpoint = 'api/articles',
      articleEndpoint = 'api/article/';

  return {

     /*
     * Return All Articles.
     */
    all: function(page) {
      var defer = $q.defer();

      $http({
        method    : 'GET',
        url       : config.serviceBaseUrl + blogEndpoint,
        dataType  : 'json',
        params    : {
          page: page,
        },
      })
      .success(function(data, status, headers, config) {
        defer.resolve(data);
      })
      .error(function(data, status, headers, config) {
        defer.reject(data);
      });

      return defer.promise;
    },

    /*
     * Return Article by ID.
     */
    get: function(articleId) {
      var defer = $q.defer();

      $http({
        method    : 'GET',
        url       : config.serviceBaseUrl + articleEndpoint + articleId,
        dataType  : 'json',
      })
      .success(function(data, status, headers, config) {
        defer.resolve(data);
      })
      .error(function(data, status, headers, config) {
        defer.reject(data);
      });

      return defer.promise;
    }
  }
}])

.factory('Comments', ['$http', '$q', 'config', function($http, $q, config) {
  //Endpoints Variables.
  var commentsCheckEndpoint = 'api/comment/countAll',
      commentsEndpoint = 'api/comments/',
      postCommentEndpoint = 'api/comment';

  return {

    /*
     * Check Comments number by Article ID.
     */
    check: function(articleId, token) {
      var defer = $q.defer();

      $http({
        method    : 'POST',
        url       : config.serviceBaseUrl + commentsCheckEndpoint,
        dataType  : 'json',
        data    : {
          nid:  articleId,
        },
        headers: {
          'X-CSRF-Token': token,
        },
      })
      .success(function(data, status, headers, config) {
        defer.resolve(data[0]);
      })
      .error(function(data, status, headers, config) {
        defer.reject(data[0]);
      });

      return defer.promise;
    },

    /*
     * Return Comments by Article ID.
     */
    get: function(articleId) {
      var defer = $q.defer();

      $http({
        method    : 'GET',
        url       : config.serviceBaseUrl + commentsEndpoint + articleId,
        dataType  : 'json',
      })
      .success(function(data, status, headers, config) {
        defer.resolve(data);
      })
      .error(function(data, status, headers, config) {
        defer.reject(data);
      });

      return defer.promise;
    },

     /*
     * Post Comment to the article.
     */
    post: function(commentData, token) {
      var defer = $q.defer();

      $http({
        method    : 'POST',
        url       : config.serviceBaseUrl + postCommentEndpoint,
        dataType  : 'json',
        data      : commentData,
        headers: {
          'X-CSRF-Token': token,
        },
      })
      .success(function(data, status, headers, config) {
        defer.resolve(data);
      })
      .error(function(data, status, headers, config) {
        defer.reject(data);
      });

      return defer.promise;
    }
  }
}])