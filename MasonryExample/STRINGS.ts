import * as Localization from 'expo-localization';

import en from './assets/langs/en.json';
import i18n from 'i18n-js';
import ko from './assets/langs/ko.json';

i18n.fallbacks = true;
i18n.translations = {en, ko};
i18n.locale = Localization.locale;

export const getString = (param: keyof typeof en, mapObj?: object): string => {
  if (mapObj) {
    return i18n.t(param, mapObj);
  }

  return i18n.t(param);
};
