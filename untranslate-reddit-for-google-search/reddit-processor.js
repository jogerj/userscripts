// Reddit Processor Module for Reddit Untranslate
// This module handles finding and processing Reddit links

(function() {
  'use strict';

  class RedditProcessor {
    constructor() {
      this.settings = {
        updateTitle: true,
        updateLinks: true
      };
    }

    async init() {
      this.settings = {
        updateTitle: await GM_getValue('UPDATE_TITLE', true),
        updateLinks: await GM_getValue('UPDATE_LINKS', true)
      };
    }

    getRedditLinks() {
      return document.querySelectorAll('a[href*="reddit.com"][href*="/?tl="]');
    }

    getTitleElement(element) {
      return element.querySelector('[role="link"], h3');
    }

    getOldRedditUrl(href) {
      const url = new URL(href);
      url.hostname = "old.reddit.com";
      const params = new URLSearchParams(url.search);
      params.delete('tl');
      params.delete('hl');
      params.delete('sl');
      url.search = params;
      return url.toString();
    }

    extractOgData(doc) {
      return [...doc.querySelectorAll('[property^="og:"]')].reduce(
        (og, element) => ({
          ...og,
          [element.getAttribute("property").slice(3)]:
            element.getAttribute("content"),
        }),
        {}
      );
    }

    async fetchDocument(url) {
      return new Promise((resolve, reject) => {
        GM.xmlHttpRequest({
          url,
          responseType: "document",
          timeout: 10000,
          onload: (response) => resolve(response.response),
          ontimeout: reject,
          onerror: reject,
        });
      });
    }

    async updateLinkHref(element) {
      if (!this.settings.updateLinks) return;
      
      const href = element.getAttribute("href");
      const url = URL.parse(href);
      const params = new URLSearchParams(url.search);
      params.delete("tl");
      params.append("show", "original");
      url.search = params;
      element.setAttribute("href", url.toString());
    }

    async updateTitleElement(titleElement) {
      if (!this.settings.updateTitle) return;
      
      try {
        const url = this.getOldRedditUrl(
          titleElement.parentElement.getAttribute("href")
        );
        const doc = await this.fetchDocument(url);
        const og = this.extractOgData(doc);
        if (og.title) {
          titleElement.textContent = og.title;
        }
      } catch (err) {
        console.warn('Failed to update title for element:', err);
      }
    }

    async processLink(element) {
      const titleElement = this.getTitleElement(element);
      if (!titleElement) {
        return;
      }
            await Promise.allSettled([
        this.updateTitleElement(titleElement),
        this.updateLinkHref(element)
      ]);
    }

    async processLinks(linkElements) {
      if (!Array.isArray(linkElements) || linkElements.length === 0) {
        return;
      }

      console.log(`Processing ${linkElements.length} Reddit links...`);
      
      const results = await Promise.allSettled(
        linkElements.map((element) => this.processLink(element))
      );

      // Log results for debugging
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;
      
      if (failed > 0) {
        console.warn(`Reddit Untranslate: ${successful} successful, ${failed} failed`);
      } else {
        console.log(`Reddit Untranslate: Successfully processed ${successful} links`);
      }
    }
  }
  window.RedditProcessor = RedditProcessor;
})();
