import getHtml from '../util/dom/getHtml'
import toggleClass, { setClass } from '../util/toggle-class'

const systemDarkMode =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

const darkMode =
  localStorage.getItem('darkMode') === null
    ? systemDarkMode
    : localStorage.getItem('darkMode') === 'true'

window.addEventListener('DOMContentLoaded', () => {
  // console.log({ systemDarkMode, darkMode })
  // setClass(getHtml(), 'dark', darkMode)
})

export {}
