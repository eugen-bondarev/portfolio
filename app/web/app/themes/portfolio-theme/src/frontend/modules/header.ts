window.addEventListener('scroll', () => {
  const header = document.querySelector('header')
  if (!header) {
    return
  }
  const scroll = window.scrollY
  if (scroll > 100) {
    header.style.boxShadow = ``
    header.style.background = ``
  } else {
    header.style.boxShadow = 'none'
    header.style.background = 'transparent'
  }
})
