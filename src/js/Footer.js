import React from 'react';

const socialLinks = [{
    id: 'github',
    url: 'https://github.com/earthspay/'
}, {
    id: 'twitter',
    url: 'https://twitter.com/@earthspay'
}, {
    id: 'facebook',
    url: 'https://www.facebook.com/earthspay/'
}, {
    id: 'discord',
    url: 'https://discord.gg/cnFmDyA'
}, {
    id: 'telegram',
    url: 'https://telegram.me/earthsnews'
}, {
    id: 'reddit',
    url: 'https://reddit.com/r/Earthspay/'
}];

const Footer = ({version}) => {
    return (
        <div className="menu-footer">
            <div>Version: {version}</div>
            <div>Brought to you by Earths Team</div>
            <div>
                {socialLinks.map(item =>
                    (<a key={item.id} className={`social ${item.id}`} href={item.url} target="_blank"></a>))}
            </div>
            <div>
                <a className="fade" href="https://earths.ga" target="_blank">earths.ga</a>
            </div>
        </div>
    );
}

export default Footer;
