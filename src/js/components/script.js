(function () {
    'use strict';

    function EarthsScriptController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };
    }

    angular
        .module('web')
        .component('earthsScript', {
            controller: EarthsScriptController,
            bindings: {
                maxLength: '<?',
                text: '<?'
            },
            template: '<span style="word-break: break-word">{{$ctrl.text}}</span>'
        });
})();