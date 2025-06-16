export function setLanguageCookie(lang: string) {
  document.cookie = `lang=${lang}; path=/; max-age=31536000`;
} 