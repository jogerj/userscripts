// ==UserScript==
// @name          Untranslate Reddit for Google Search
// @description   Untranslate Reddit results from Google Search
// @version       0.4.0
// @icon          https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico
// @author        JogerJ
// @author        KaKi87
// @license       MIT
// @namespace     https://jogerj.com
// @updateURL     https://raw.githubusercontent.com/jogerj/userscripts/refs/heads/main/untranslate-reddit-for-google-search/main.user.js
// @downloadURL   https://raw.githubusercontent.com/jogerj/userscripts/refs/heads/main/untranslate-reddit-for-google-search/main.user.js
//
// @grant         GM.xmlHttpRequest
// @grant         GM_setValue
// @grant         GM_getValue
// @connect       old.reddit.com
//
// @require       https://github.com/jogerj/userscripts/raw/refs/tags/untranslate-reddit-for-google-search/0.4.0/untranslate-reddit-for-google-search/settings-ui.js
// @require       https://github.com/jogerj/userscripts/raw/refs/tags/untranslate-reddit-for-google-search/0.4.0/untranslate-reddit-for-google-search/reddit-processor.js
//
// @match         http*://*.google.com/search*
// @match         http*://*.google.ad/search*
// @match         http*://*.google.ae/search*
// @match         http*://*.google.com.af/search*
// @match         http*://*.google.com.ag/search*
// @match         http*://*.google.al/search*
// @match         http*://*.google.am/search*
// @match         http*://*.google.co.ao/search*
// @match         http*://*.google.com.ar/search*
// @match         http*://*.google.as/search*
// @match         http*://*.google.at/search*
// @match         http*://*.google.com.au/search*
// @match         http*://*.google.az/search*
// @match         http*://*.google.ba/search*
// @match         http*://*.google.com.bd/search*
// @match         http*://*.google.be/search*
// @match         http*://*.google.bf/search*
// @match         http*://*.google.bg/search*
// @match         http*://*.google.com.bh/search*
// @match         http*://*.google.bi/search*
// @match         http*://*.google.bj/search*
// @match         http*://*.google.com.bn/search*
// @match         http*://*.google.com.bo/search*
// @match         http*://*.google.com.br/search*
// @match         http*://*.google.bs/search*
// @match         http*://*.google.bt/search*
// @match         http*://*.google.co.bw/search*
// @match         http*://*.google.by/search*
// @match         http*://*.google.com.bz/search*
// @match         http*://*.google.ca/search*
// @match         http*://*.google.cd/search*
// @match         http*://*.google.cf/search*
// @match         http*://*.google.cg/search*
// @match         http*://*.google.ch/search*
// @match         http*://*.google.ci/search*
// @match         http*://*.google.co.ck/search*
// @match         http*://*.google.cl/search*
// @match         http*://*.google.cm/search*
// @match         http*://*.google.cn/search*
// @match         http*://*.google.com.co/search*
// @match         http*://*.google.co.cr/search*
// @match         http*://*.google.com.cu/search*
// @match         http*://*.google.cv/search*
// @match         http*://*.google.com.cy/search*
// @match         http*://*.google.cz/search*
// @match         http*://*.google.de/search*
// @match         http*://*.google.dj/search*
// @match         http*://*.google.dk/search*
// @match         http*://*.google.dm/search*
// @match         http*://*.google.com.do/search*
// @match         http*://*.google.dz/search*
// @match         http*://*.google.com.ec/search*
// @match         http*://*.google.ee/search*
// @match         http*://*.google.com.eg/search*
// @match         http*://*.google.es/search*
// @match         http*://*.google.com.et/search*
// @match         http*://*.google.fi/search*
// @match         http*://*.google.com.fj/search*
// @match         http*://*.google.fm/search*
// @match         http*://*.google.fr/search*
// @match         http*://*.google.ga/search*
// @match         http*://*.google.ge/search*
// @match         http*://*.google.gg/search*
// @match         http*://*.google.com.gh/search*
// @match         http*://*.google.com.gi/search*
// @match         http*://*.google.gl/search*
// @match         http*://*.google.gm/search*
// @match         http*://*.google.gr/search*
// @match         http*://*.google.com.gt/search*
// @match         http*://*.google.gy/search*
// @match         http*://*.google.com.hk/search*
// @match         http*://*.google.hn/search*
// @match         http*://*.google.hr/search*
// @match         http*://*.google.ht/search*
// @match         http*://*.google.hu/search*
// @match         http*://*.google.co.id/search*
// @match         http*://*.google.ie/search*
// @match         http*://*.google.co.il/search*
// @match         http*://*.google.im/search*
// @match         http*://*.google.co.in/search*
// @match         http*://*.google.iq/search*
// @match         http*://*.google.is/search*
// @match         http*://*.google.it/search*
// @match         http*://*.google.je/search*
// @match         http*://*.google.com.jm/search*
// @match         http*://*.google.jo/search*
// @match         http*://*.google.co.jp/search*
// @match         http*://*.google.co.ke/search*
// @match         http*://*.google.com.kh/search*
// @match         http*://*.google.ki/search*
// @match         http*://*.google.kg/search*
// @match         http*://*.google.co.kr/search*
// @match         http*://*.google.com.kw/search*
// @match         http*://*.google.kz/search*
// @match         http*://*.google.la/search*
// @match         http*://*.google.com.lb/search*
// @match         http*://*.google.li/search*
// @match         http*://*.google.lk/search*
// @match         http*://*.google.co.ls/search*
// @match         http*://*.google.lt/search*
// @match         http*://*.google.lu/search*
// @match         http*://*.google.lv/search*
// @match         http*://*.google.com.ly/search*
// @match         http*://*.google.co.ma/search*
// @match         http*://*.google.md/search*
// @match         http*://*.google.me/search*
// @match         http*://*.google.mg/search*
// @match         http*://*.google.mk/search*
// @match         http*://*.google.ml/search*
// @match         http*://*.google.com.mm/search*
// @match         http*://*.google.mn/search*
// @match         http*://*.google.com.mt/search*
// @match         http*://*.google.mu/search*
// @match         http*://*.google.mv/search*
// @match         http*://*.google.mw/search*
// @match         http*://*.google.com.mx/search*
// @match         http*://*.google.com.my/search*
// @match         http*://*.google.co.mz/search*
// @match         http*://*.google.com.na/search*
// @match         http*://*.google.com.ng/search*
// @match         http*://*.google.com.ni/search*
// @match         http*://*.google.ne/search*
// @match         http*://*.google.nl/search*
// @match         http*://*.google.no/search*
// @match         http*://*.google.com.np/search*
// @match         http*://*.google.nr/search*
// @match         http*://*.google.nu/search*
// @match         http*://*.google.co.nz/search*
// @match         http*://*.google.com.om/search*
// @match         http*://*.google.com.pa/search*
// @match         http*://*.google.com.pe/search*
// @match         http*://*.google.com.pg/search*
// @match         http*://*.google.com.ph/search*
// @match         http*://*.google.com.pk/search*
// @match         http*://*.google.pl/search*
// @match         http*://*.google.pn/search*
// @match         http*://*.google.com.pr/search*
// @match         http*://*.google.ps/search*
// @match         http*://*.google.pt/search*
// @match         http*://*.google.com.py/search*
// @match         http*://*.google.com.qa/search*
// @match         http*://*.google.ro/search*
// @match         http*://*.google.ru/search*
// @match         http*://*.google.rw/search*
// @match         http*://*.google.com.sa/search*
// @match         http*://*.google.com.sb/search*
// @match         http*://*.google.sc/search*
// @match         http*://*.google.se/search*
// @match         http*://*.google.com.sg/search*
// @match         http*://*.google.sh/search*
// @match         http*://*.google.si/search*
// @match         http*://*.google.sk/search*
// @match         http*://*.google.com.sl/search*
// @match         http*://*.google.sn/search*
// @match         http*://*.google.so/search*
// @match         http*://*.google.sm/search*
// @match         http*://*.google.sr/search*
// @match         http*://*.google.st/search*
// @match         http*://*.google.com.sv/search*
// @match         http*://*.google.td/search*
// @match         http*://*.google.tg/search*
// @match         http*://*.google.co.th/search*
// @match         http*://*.google.com.tj/search*
// @match         http*://*.google.tl/search*
// @match         http*://*.google.tm/search*
// @match         http*://*.google.tn/search*
// @match         http*://*.google.to/search*
// @match         http*://*.google.com.tr/search*
// @match         http*://*.google.tt/search*
// @match         http*://*.google.com.tw/search*
// @match         http*://*.google.co.tz/search*
// @match         http*://*.google.com.ua/search*
// @match         http*://*.google.co.ug/search*
// @match         http*://*.google.co.uk/search*
// @match         http*://*.google.com.uy/search*
// @match         http*://*.google.co.uz/search*
// @match         http*://*.google.com.vc/search*
// @match         http*://*.google.co.ve/search*
// @match         http*://*.google.co.vi/search*
// @match         http*://*.google.com.vn/search*
// @match         http*://*.google.vu/search*
// @match         http*://*.google.ws/search*
// @match         http*://*.google.rs/search*
// @match         http*://*.google.co.za/search*
// @match         http*://*.google.co.zm/search*
// @match         http*://*.google.co.zw/search*
// @match         http*://*.google.cat/search*
// ==/UserScript==

(async () => {
  try {
    const processor = new window.RedditProcessor();
    await processor.init();

    const linkElements = Array.from(processor.getRedditLinks());
    
    if (linkElements.length > 0) {
      const settingsUI = new window.SettingsUI(processor.settings);
      settingsUI.create();
      await processor.processLinks(linkElements);
    }
  } catch (err) {
    console.error('Reddit Untranslate Error:', err);
  }
})();