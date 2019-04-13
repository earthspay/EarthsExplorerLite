(function () {
    'use strict';

    angular.module('web').constant('appConfig', {
        apiDomain: 'https://devnet.earthsnodes.earths.ga',
        dataServiceBaseUrl: 'https://api.earths.ga/v0',
        title: 'Earths Devnet Explorer',
        blockchainName: 'Devnet',
        nodes: [
            {url: 'https://devnet.earthsnodes.earths.ga', maintainer: 'Earths', showAsLink: true}
        ],
        peerExplorer: {
            url: 'http://devnet.explorer.earths.ga',
            title: 'Devnet Explorer'
        },
        wallet: {
            url: 'https://testnet.earths.ga',
            title: 'Wallet'
        }
    });


    angular.module('web').constant('constants.network', {
        NETWORK_NAME: 'devnet', // 'devnet', 'testnet', 'mainnet'
        ADDRESS_VERSION: 1,
        NETWORK_CODE: 'D',
        INITIAL_NONCE: 0
    });
})();
