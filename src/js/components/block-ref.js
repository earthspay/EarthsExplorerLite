(function () {
    'use strict';

    angular
        .module('web')
        .component('earthsBlockRef', {
            bindings: {
                height: '<'
            },
            template: '<a ui-sref="block-details({height:$ctrl.height})">{{$ctrl.height}}</a>'
        });
})();