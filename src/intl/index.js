import load from "load-script";
import invariant from "invariant";
import * as constants from "./constants";
import isElectron from 'is-electron';

import intlUniversal from "react-intl-universal";
const isBrowser = !isElectron() && typeof window !== "undefined";
const COMMON_LOCALE_DATA_URLS = {
    en: "./locale-data/1.0.0/en.js",
    zh: "./locale-data/1.0.0/zh.js",
    fr: "./locale-data/1.0.0/fr.js",
    ja: "./locale-data/1.0.0/ja.js",
    de: "./locale-data/1.0.0/de.js",
    es: "./locale-data/1.0.0/es.js",
    ko: "./locale-data/1.0.0/ko.js",
    pt: "./locale-data/1.0.0/pt.js",
    it: "./locale-data/1.0.0/it.js",
    ru: "./locale-data/1.0.0/ru.js",
    pl: "./locale-data/1.0.0/pl.js",
};

class Intl {}

Intl.prototype = intlUniversal;

/**
 * Initialize properties and load CLDR locale data according to currentLocale
 * @param {Object} options
 * @param {string} options.currentLocale Current locale such as 'en-US'
 * @param {string} options.locales App locale data like {"en-US":{"key1":"value1"},"zh-CN":{"key1":"值1"}}
 * @returns {Promise}
 */
Intl.prototype.init = function init(options = {}) {
    invariant(options.currentLocale, "options.currentLocale is required");
    invariant(options.locales, "options.locales is required");

    Object.assign(this.options, options);

    this.options.formats = Object.assign({},
        this.options.formats,
        constants.defaultFormats
    );

    return new Promise((resolve, reject) => {

        const lang = this.options.currentLocale.split('-')[0].split('_')[0];
        const langUrl = COMMON_LOCALE_DATA_URLS[lang];
        if (isBrowser) {
            if (langUrl) {
                load(langUrl, (err, script) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } else {
                this.options.warningHandler(`lang "${lang}" is not supported.`);
                resolve();
            }
        } else {
            // For Node.js, common locales are added in the application
            resolve();
        }
    });
}

const intl = new Intl();
export default intl;