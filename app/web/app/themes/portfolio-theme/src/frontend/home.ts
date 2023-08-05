export const goHome = () => {
  const variants = [window.origin, `${window.origin}/de`]
  variants.sort((a, b) => b.length - a.length)
  const homeUrl =
    variants.find((variant) => window.location.href.includes(variant)) ??
    window.origin
  ;(window as Window).location = homeUrl
}

document.addEventListener('DOMContentLoaded', () =>
  document.querySelector('#home')?.addEventListener('click', goHome)
)
