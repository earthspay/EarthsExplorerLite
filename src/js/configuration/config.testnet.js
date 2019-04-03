const nodeUrl = 'https://testnode1.earthsnodes.earths.ga';

export default {
    networkId: 'testnet',
    displayName: 'Testnet',
    apiBaseUrl: nodeUrl,
    dataServicesBaseUrl: 'https://api.testnet.earths.ga/v0',
    nodes: [
        {url: nodeUrl, maintainer: 'Earths', showAsLink: true},
        {url: 'https://testnode2.earthsnodes.earths.ga', maintainer: 'Earths', showAsLink: true},
        {url: 'https://testnode3.earthsnodes.earths.ga', maintainer: 'Earths', showAsLink: true},
        {url: 'https://testnode4.earthsnodes.earths.ga', maintainer: 'Earths', showAsLink: true}
    ],
    faucet: {
        url: 'https://testnode1.earthsnodes.earths.ga/faucet',
        captchaKey: '6LdT8pAUAAAAAOhIIJGKA6HAOo7O98gdIoUgznKL',
        address: '3MxyKNmnQkVuDCG9AzMpixKCdUWXfMUsxdg'
    }
};
