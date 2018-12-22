const nodeUrl = 'http://18.203.15.139:6869';
export default {
    networkId: 'devnet',
    displayName: 'Devnet',
    apiBaseUrl: nodeUrl,
    spamListUrl: 'https://raw.githubusercontent.com/wavesplatform/waves-community/master/Scam%20tokens%20according%20to%20the%20opinion%20of%20Waves%20Community.csv',
    nodes: [
        {url: nodeUrl, maintainer: 'Waves', showAsLink: true},
        {url: 'http://34.237.49.199:6869', maintainer: 'Waves', showAsLink: true},
        {url: 'http://35.157.212.173:6869', maintainer: 'Waves', showAsLink: true},
        {url: 'http://52.28.115.7:6869', maintainer: 'Waves', showAsLink: true},
        {url: 'http://13.228.127.88:6869', maintainer: 'Waves', showAsLink: true},
        {url: 'http://52.192.190.54:6869', maintainer: 'Waves', showAsLink: true}
    ]
};
