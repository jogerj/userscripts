// ==UserScript==
// @name         Payback Coupon Auto-Activator
// @description  Alle coupons auf payback.de/coupons automatisch aktivieren
// @version      0.1.1
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

    /**
     * Waits for coupon activation buttons to appear on the page.
     * @returns {Promise<HTMLButtonElement[]>} Promise resolving to an array of not-activated coupon buttons.
     */
    async function waitForCoupons() {
        console.log('[Payback-Activator] Coupons werden geladen...');
        const start = Date.now();
        while (Date.now() - start <= TIMEOUT_MS) {
            /** @type {HTMLButtonElement[]} */
            const buttons = [...document.querySelectorAll('button[data-testid$="-not_activated"]')];
            if (buttons.length > 0) {
                console.log(`[Payback-Activator] ${buttons.length} nicht aktivierte Coupon(s) gefunden.`);
                return buttons;
            }
            await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
        }
        return [];
    }

    /**
     * Clicks all provided coupon activation buttons with a delay between each.
     * @param {HTMLButtonElement[]} buttons - Array of coupon activation buttons.
     * @returns {Promise<void>} Promise that resolves when all buttons have been clicked.
     */
    async function clickAllButtons(buttons) {
        for (const btn of buttons) {
            btn.scrollIntoView({ block: 'center' });
            btn.click();
            await new Promise(r => setTimeout(r, CLICK_DELAY_MS));
        }
    }

    /**
     * Gets the testid data attribute from a button.
     * @param {HTMLButtonElement[]} buttons - The button elements.
     * @returns {Set<string>} The testid values.
     */
    function getIds(buttons) {
        return new Set(buttons.map(button => button.dataset.testid));
    }

    let buttons = await waitForCoupons();
    const clicked = getIds(buttons);
    while (buttons.length > 0) {
        await clickAllButtons(buttons);
        buttons = await waitForCoupons();
        for (const id of getIds(buttons)) {
            clicked.add(id);
        }
    }
    console.log('[Payback-Activator] Keine weitere inaktive Coupons gefunden.');
    if (clicked.size > 0 && confirm(`${clicked.size} Coupon(s) aktiviert. Neu laden?`)) {
        location.reload();
    }
})();
