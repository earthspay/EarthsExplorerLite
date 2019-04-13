(function() {
    'use strict';

    angular.module('web').filter('earthsdate', function($filter) {
        var originalDateFilter = $filter('date');

        return function(input) {
            return originalDateFilter(input, 'yyyy-MM-dd HH:mm:ss');
        };
    });
})();
