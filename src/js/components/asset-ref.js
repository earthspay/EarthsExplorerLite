(function () {
    'use strict';

    function EarthsAssetRefController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };

        ctrl.$onChanges = function (changesObj) {
            if (changesObj.assetId) {
                if (!ctrl.text)
                    ctrl.text = changesObj.assetId.currentValue;
            }
        }
    }

    angular
        .module('web')
        .component('earthsAssetRef', {
            controller: EarthsAssetRefController,
            bindings: {
                assetId: '<',
                maxLength: '<?',
                text: '<?'
            },
            template: '<span ng-if="$ctrl.assetId === null">EARTHS</span>' +
                '<earths-transaction-ref ng-if="$ctrl.assetId !== null" tx-id="$ctrl.assetId" text="$ctrl.text"></earths-transaction-ref>'
        });
})();