import intl from './intl';
import http from "axios";
import _ from "lodash";


const SUPPOER_LOCALES = [{
        name: "English",
        value: "en-US"
    },
    {
        name: "简体中文",
        value: "zh-CN"
    },
    {
        name: "繁體中文",
        value: "zh-TW"
    },
    {
        name: "français",
        value: "fr-FR"
    },
    {
        name: "日本の",
        value: "ja-JP"
    }
];

export function loadIntlResources(callback, module) {

    let localePath = '/assets/locales/';
    if (module) {
        localePath = localePath + module + '/';
    }
    let currentLocale = localStorage.getItem('pilot:currentLocale');
    if (!currentLocale || !_.find(SUPPOER_LOCALES, { value: currentLocale })) {
        currentLocale = "zh-CN";
    }
    const version = '0.0.1'; // require('package.json').version
    //because in the project setting , front end source are only located under assets folder
    http.get(`${localePath}${currentLocale}.json?v=${version}`)
        .then(res => {
            const localeResource = Object.assign(intl.options.locales[currentLocale] || {}, res.data);
            return intl.init({
                currentLocale,
                locales: {
                    [currentLocale]: localeResource
                }
            });
        })
        .then(() => {
            // After loading CLDR locale data, start to render
            callback && callback();
        });
}