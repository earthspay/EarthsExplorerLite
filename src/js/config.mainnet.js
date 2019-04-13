(function() {
    'use strict';

    angular.module('web').constant('appConfig', {
        apiDomain: 'https://earthsnodes.earths.ga',
        dataServiceBaseUrl: 'https://api.earths.ga/v0',
        blockchainName: 'Mainnet',
        title: 'Earths Explorer',
        nodes: [{
            url: 'https://earthsnodes.earths.ga',
            maintainer: 'Earths'
        }],
        peerExplorer: {
            url: 'https://testnet.explorer.earths.ga',
            title: 'TESTNET Explorer'
        },
        wallet: {
            url: 'https://lc.earths.ga',
            title: 'Wallet'
        }
    });

    angular.module('web').constant('constants.network', {
        NETWORK_NAME: 'mainnet', // 'devnet', 'testnet', 'mainnet'
        ADDRESS_VERSION: 1,
        NETWORK_CODE: 'W',
        INITIAL_NONCE: 0
    });
})();