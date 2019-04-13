(function () {
    'use strict';

    angular.module('web').constant('appConfig', {
        apiDomain: 'https://pool.testnet.earthsnodes.earths.ga',
        dataServiceBaseUrl: 'https://api.testnet.earths.ga/v0',
        title: 'Earths Testnet Explorer',
        blockchainName: 'Testnet',
        nodes: [
            {url: 'https://testnode1.earthsnodes.earths.ga', maintainer: 'Earths', showAsLink: true},
            {url: 'https://testnode2.earthsnodes.earths.ga', maintainer: 'Earths', showAsLink: true},
            {url: 'https://testnode3.earthsnodes.earths.ga', maintainer: 'Earths', showAsLink: true},
            {url: 'https://testnode4.earthsnodes.earths.ga', maintainer: 'Earths', showAsLink: true}
        ],
        faucet: {
            url: 'https://testnode1.earthsnodes.earths.ga/faucet',
            captchaKey: '6Le9hSgUAAAAAAtIe04SrgDy23PsBZOazfb-li66'
        },
        peerExplorer: {
            url: 'https://explorer.earths.ga',
            title: 'MAINNET Explorer'
        },
        wallet: {
            url: 'https://testnet.earths.ga',
            title: 'Wallet'
        }
    });

    angular.module('web').constant('constants.network', {
        NETWORK_NAME: 'devel', // 'devnet', 'testnet', 'mainnet'
        ADDRESS_VERSION: 1,
        NETWORK_CODE: 'T',
        INITIAL_NONCE: 0
    });
})();
