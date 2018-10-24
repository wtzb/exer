import React from 'react';
import { Layout, Popover } from 'antd';

const { Footer } = Layout;

var jsonPackage = require('../../package.json');

const contactContent = (
    <div>
        <p><a href="mailto:exer@wietzeb.nl">Email</a></p>
        <p><a href="https://twitter.com/wtzb_">Twitter</a></p>
        <p><a href="https://reddit.com/user/wtzb">Reddit</a></p>
        <p><a href="https://keybase.io/wtzb">Keybase</a></p>
    </div>
);
  
const FooterCont = () => (
    <Footer style={{ textAlign: 'center' }}>
    v{jsonPackage.version} - Created by <a href="https://github.com/wtzb/">Wietze Bronkema</a> - <a href="https://github.com/wtzb/exer">GitHub</a> - <a><Popover content={contactContent}>Contact</Popover></a> - Powered by <a href="https://infura.io/">Infura</a>
    </Footer>
)

export default FooterCont;