(function () {
    'use strict';

    var DEFAULT_MAX_LENGTH = 32;

    function EarthsDataKeyController() {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.maxLength = ctrl.maxLength | DEFAULT_MAX_LENGTH;
        };
    }

    angular
        .module('web')
        .component('earthsDataKey', {
            controller: EarthsDataKeyController,
            bindings: {
                maxLength: '<?',
                text: '<?'
            },
            template: '{{$ctrl.text|limitTo:$ctrl.maxLength}}{{$ctrl.text.length > $ctrl.maxLength ? "&hellip;" : ""}}'
        });
})();