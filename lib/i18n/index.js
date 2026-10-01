import en from './en';
import ar from './ar';

export const locales = ['en', 'ar'];
export const defaultLocale = 'en';
export const dir = (lang) => (lang === 'ar' ? 'rtl' : 'ltr');

const dictionaries = { en, ar };
export const hasLocale = (lang) => Object.hasOwn(dictionaries, lang);
export const getDictionary = (lang) => dictionaries[lang] ?? dictionaries[defaultLocale];
