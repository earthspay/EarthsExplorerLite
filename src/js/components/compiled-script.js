(function () {
    'use strict';

    var DEFAULT_MAX_LENGTH = 110;

    function EarthsCompiledScriptController() {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.maxLength = ctrl.maxLength | DEFAULT_MAX_LENGTH;
        };
    }

    angular
        .module('web')
        .component('earthsCompiledScript', {
            controller: EarthsCompiledScriptController,
            bindings: {
                maxLength: '<?',
                text: '<?'
            },
            template: '<span style="line-height: 30px">{{$ctrl.text|limitTo:$ctrl.maxLength}}{{$ctrl.text.length > $ctrl.maxLength ? "&hellip;" : ""}}</span>' +
                '<earths-copy-button text="$ctrl.text"></earths-copy-button>'
        });
})();