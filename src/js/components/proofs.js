(function () {
    'use strict';

    function EarthsProofsController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };
    }

    angular
        .module('web')
        .component('earthsProofs', {
            controller: EarthsProofsController,
            bindings: {
                proofs: '<'
            },
            template: '{{$ctrl.proofs.join(", ")}}'
        });
})();