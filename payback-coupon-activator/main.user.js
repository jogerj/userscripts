// ==UserScript==
// @name         Payback Coupon Auto-Activator
// @description  Alle coupons auf payback.de/coupons automatisch aktivieren
// @version      0.1.0
// @author       jogerj
// @license      MIT
// @namespace    https://jogerj.com
// @updateURL    https://raw.githubusercontent.com/jogerj/userscripts/refs/heads/main/payback-coupon-activator/main.user.js
// @downloadURL  https://raw.githubusercontent.com/jogerj/userscripts/refs/heads/main/payback-coupon-activator/main.user.js
// @icon         https://www.payback.de/favicon.ico
// @match        https://www.payback.de/coupons
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(async () => {
    'use strict';

    const CLICK_DELAY_MS = 100;
    const POLL_INTERVAL_MS = 300;
    const TIMEOUT_MS = 50 * POLL_INTERVAL_MS;

    async function waitForCoupons() {
        console.log('[Payback] Coupons werden geladen...');
        const start = Date.now();
        while (Date.now() - start <= TIMEOUT_MS) {
            const buttons = [...document.querySelectorAll('button[data-testid$="-not_activated"]')];
            if (buttons.length > 0) {
                console.log(`[Payback] ${buttons.length} nicht aktivierte Coupon(s) gefunden.`);
                return buttons;
            }
            await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
        }
        return [];
    }

    async function clickAllButtons(buttons) {
        for (const btn of buttons) {
            btn.scrollIntoView({ block: 'center' });
            btn.click();
            await new Promise(r => setTimeout(r, CLICK_DELAY_MS));
        }
        console.log(`[Payback] Fertig — ${buttons.length} Coupon(s) aktiviert.`);
    }

    let buttons = await waitForCoupons();
    let count = buttons.length
    while (buttons.length > 0) {
        await clickAllButtons(buttons);
        buttons = await waitForCoupons();
        count += buttons.length;
    }
    if (count > 0 && confirm(`${count} Coupon(s) aktiviert. Neu laden?`)) {
        location.reload();
    }
})();
