export const languages = {
  en: 'English',
  de: 'Deutsch',
};

export const defaultLang = 'en';

export const urlSuffixes = {
  en: '',
  de: '/de'
} as const

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About me',
    'nav.tech-stack': 'Tech stack',
    'hero.title': 'Hi, I\'m Eugen',
    'hero.subtitle': 'I can build anything - scalable infrastructures, web apps, games, AI, astonishing UX/UI'
  },
  de: {
    'nav.home': 'Home',
    'nav.about': 'Über mich',
    'nav.tech-stack': 'Tech-Stack',
    'hero.title': 'Hi, ich bin Eugen',
    'hero.subtitle': 'Ich kann alles - skalierbare Infrastrukturen, Web-Apps, Spiele, KI, atemberaubende UX/UI'
  },
} as const;
