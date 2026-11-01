import { uiId } from '../data/ui-id';
export type Language = 'en' | 'id';
export const getLanguage = (path: string): Language =>
  /^\/id(?:\/|$)/.test(path) ? 'id' : 'en';
export const withoutLanguage = (path: string): string =>
  path.replace(/^\/id(?=\/|$)/, '') || '/';
export function localizePath(path: string, language: Language): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const base = withoutLanguage(path);
  return language === 'id'
    ? `/id${base.startsWith('/') ? base : '/' + base}`
    : base;
}
export const normalizeText = (text: string) => text.replace(/\s+/g, ' ').trim();
export function createTranslator(language: Language) {
  return (text: string): string =>
    language === 'id'
      ? (uiId[normalizeText(text)] ?? normalizeText(text))
      : normalizeText(text);
}
