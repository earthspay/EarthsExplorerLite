(function () {
    'use strict';

    function EarthsTransactionRawController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };

        ctrl.$onChanges = function (changesObj) {
            if (changesObj.tx) {
                if (!ctrl.text)
                    ctrl.text = JSON.stringify(changesObj.tx.currentValue, null, 4);
            }
        }
    }

    angular
        .module('web')
        .component('earthsTransactionRaw', {
            controller: EarthsTransactionRawController,
            bindings: {
                tx: '<'
            },
            template: '<pre>{{$ctrl.text}}</pre>'
        });
})();