import en from './en';
import ar from './ar';

export const locales = ['en', 'ar'];
export const defaultLocale = 'en';
export const dir = (lang) => (lang === 'ar' ? 'rtl' : 'ltr');

const dictionaries = { en, ar };
export const hasLocale = (lang) => Object.hasOwn(dictionaries, lang);
export const getDictionary = (lang) => dictionaries[lang] ?? dictionaries[defaultLocale];

export const projectSlugs = en.work.products.map((p) => p.slug);
export const getProjectBySlug = (lang, slug) => {
  const t = getDictionary(lang);
  const index = t.work.products.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  return { ...t.work.products[index], index };
};
