# untranslate-reddit-for-google-search

Untranslate Reddit for Google Search

Forked from [version 0.2.0](https://git.kaki87.net/KaKi87/userscripts/src/commit/8e29e6ce734bbf272304af537f1ccc46956c7998/untranslateRedditForGoogleSearch/main.user.js)

## Installation

Install [Tampermonkey](https://www.tampermonkey.net/) and [download the script](https://raw.githubusercontent.com/jogerj/userscripts/refs/heads/main/untranslate-reddit-for-google-search/main.user.js).

## Changelog

### 0.4.0

* Refactored for readability, split to modular js files
* Use `Promise.allSettled`
* Replace urls to show original
* Add UI settings to toggle

### 0.3.0

* Fix to manually verbosely match all TLDs from <https://www.google.com/supported_domains>.
  Replaced `/(\.google\.\w+(\.\w+)*)\s?/` with `// @match         http*://*$1/search*\n`
